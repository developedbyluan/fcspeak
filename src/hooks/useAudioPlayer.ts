import { useEffect, useState, useRef } from "react";
import { LyricsUnit, LyricsUnitMeta } from "@/types/lyric";
import { useToast } from "@/hooks/use-toast";

let logsName: string;

export default function useAudioPlayer(lyricsUnit: LyricsUnit | null) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isLineFinished, setIsLineFinished] = useState(false);
  const [lyricsUnitMeta, setLyricsUnitMeta] = useState<LyricsUnitMeta | null>(
    null
  );
  const [audioProgress, setAudioProgress] = useState(0);
  const lineTimeOutRef = useRef<NodeJS.Timeout | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (!lyricsUnit) return;
    setLyricsUnitMeta(lyricsUnit.meta);
    logsName = `${lyricsUnit.meta.slug}-pronunciation-course-logs`;
  }, [lyricsUnit]);

  useEffect(() => {
    if (!lyricsUnit) return;
    handleAudioTogglePlayPause();
    handleCalculateAudioProgress();
  }, [currentLyricIndex]);

  useEffect(() => {
    if (!isPlaying) return;
    handleSaveUnitPronunciationCourseLog();
  }, [isPlaying]);

  const handleAudioFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!lyricsUnit) return;
    try {
      const file = event.target.files?.[0];
      if (file && file.name !== lyricsUnitMeta?.fileName) {
        throw new Error("File name does not match");
      }
      if (file && file.type === "audio/mpeg") {
        const objectUrl = URL.createObjectURL(file);
        setAudioSrc(objectUrl);

        setIsPlaying(false);
        setCurrentLyricIndex(0);
        setIsLineFinished(false);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message +
          ".\nPlease upload the audio file " +
          lyricsUnitMeta?.fileName,
        variant: "destructive",
      });
    }
  };

  const handleAudioTogglePlayPause = () => {
    const audioElement = audioRef.current;
    const lineTimeOut = lineTimeOutRef.current;
    if (!audioElement || !lyricsUnit) return;

    if (isPlaying) {
      if (lineTimeOut) {
        clearTimeout(lineTimeOut);
        lineTimeOutRef.current = null;
      }
      audioElement.pause();
      setIsPlaying(false);
      return;
    }

    audioElement.currentTime = lyricsUnit.lyrics[currentLyricIndex].startTime;
    audioElement.play();
    setIsPlaying(true);
    handleLineFinished();
  };

  const handleLineFinished = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    if (!lyricsUnit) return;

    const startTime = lyricsUnit.lyrics[currentLyricIndex].startTime;
    const endTime = lyricsUnit.lyrics[currentLyricIndex].endTime;
    const lineDuration = endTime - startTime;

    lineTimeOutRef.current = setTimeout(() => {
      audioElement.pause();
      setIsPlaying(false);
      setIsLineFinished(true);
    }, lineDuration * 1000);
  };

  const handleNextLine = () => {
    if (!lyricsUnit) return;
    if (currentLyricIndex === lyricsUnit.lyrics.length - 1) {
      setCurrentLyricIndex(0);
    } else {
      setCurrentLyricIndex((prevIndex) => prevIndex + 1);
    }
    setIsLineFinished(false);
  };

  const handleCalculateAudioProgress = () => {
    if (!lyricsUnit) return;
    const audioElement = audioRef.current;
    if (!audioElement) return;
    const audioDuration = audioElement.duration;
    const progress = (audioElement.currentTime / audioDuration) * 100;
    setAudioProgress(progress);
  };

  const handleSaveUnitPronunciationCourseLog = () => {
    if (!lyricsUnit) return;
    const pronunciationLogs = localStorage.getItem(logsName);
    if (!pronunciationLogs) {
      localStorage.setItem(
        logsName,
        JSON.stringify({ [lyricsUnit.meta.slug]: { currentIndex: 0 } })
      );
      return;
    }
    const pronunciationLogsObj = JSON.parse(pronunciationLogs);
    pronunciationLogsObj[lyricsUnit.meta.slug].currentIndex = currentLyricIndex;
    localStorage.setItem(logsName, JSON.stringify(pronunciationLogsObj));
  };

  const gotoPreviousSessionLine = () => {
    if (!lyricsUnit) return;
    const pronunciationLogs = localStorage.getItem(logsName);
    if (!pronunciationLogs) {
      toast({
        title: "Error",
        description: "No pronunciation logs found",
        variant: "destructive",
      });
      return;
    }
    const pronunciationLogsObj = JSON.parse(pronunciationLogs);
    const currentIndex =
      pronunciationLogsObj[lyricsUnit.meta.slug].currentIndex;
    setCurrentLyricIndex(currentIndex);
    setIsLineFinished(false);
  };

  return {
    audioSrc,
    audioRef,
    handleAudioFileChange,
    isPlaying,
    isLineFinished,
    handleAudioTogglePlayPause,
    lyricsUnitMeta,
    currentLyricIndex,
    handleLineFinished,
    handleNextLine,
    audioProgress,
    gotoPreviousSessionLine,
  };
}
