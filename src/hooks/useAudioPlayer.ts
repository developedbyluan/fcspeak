import { useEffect, useState, useRef } from "react";
import { LyricsUnit, LyricsUnitMeta } from "@/types/lyric";
import { useToast } from "@/hooks/use-toast";

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
  }, [lyricsUnit]);

  useEffect(() => {
    if (!lyricsUnit) return;
    handleAudioTogglePlayPause();
    handleCalculateAudioProgress();
  }, [currentLyricIndex]);

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
      console.error("The catched error:", (error as Error).message);
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
    console.log("handleNextLine");
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
  };
}
