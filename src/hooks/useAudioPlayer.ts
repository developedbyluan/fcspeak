import { useEffect, useState, useRef } from "react";
import { LyricsUnit, LyricsUnitMeta } from "@/types/lyric";
import { useToast } from "@/hooks/use-toast";

let logsName: string;
const today = new Date().toISOString().split("T")[0];
const dayName = new Date().toLocaleDateString("en-US", {
  weekday: "short",
});

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
  const [lyricProgress, setLyricProgress] = useState({
    currentLine: 0,
    totalLines: 0,
  });

  const [isCurrentProgressFull, setIsCurrentProgressFull] = useState(false);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  const lyricRefs = useRef<HTMLDivElement[]>([]);
  const [showAutoPausePlayer, setShowAutoPausePlayer] = useState(true);
  const [isAutoPauseOn, setIsAutoPauseOn] = useState(false);

  const [currentProgress, setCurrentProgress] = useState<number[]>([]);
  const [playbackRate, setPlaybackRate] = useState(1);

  const { toast } = useToast();

  useEffect(() => {
    if (!lyricsUnit) return;
    setLyricsUnitMeta(lyricsUnit.meta);
    logsName = `${lyricsUnit.meta.slug}-pronunciation-course-logs`;

    handleSaveUnitPronunciationCourseLog();
    setLyricProgress({
      currentLine: 1,
      totalLines: lyricsUnit.lyrics.length,
    });

    addLessonMetaToContinueTrainingHistoryInLocalStorage(lyricsUnit.meta.slug);

    // TODO: get current progress from local storage
    const unitPronunciationLogs = localStorage.getItem(logsName);
    if (unitPronunciationLogs) {
      const unitPronunciationLogsObj = JSON.parse(unitPronunciationLogs);
      const currentProgress =
        unitPronunciationLogsObj[lyricsUnit.meta.slug].currentProgress;
      setCurrentProgress(currentProgress);
    }
  }, [lyricsUnit]);

  useEffect(() => {
    if (!lyricsUnit) return;
    handleAudioTogglePlayPause();
    handleCalculateAudioProgress();

    setLyricProgress({
      currentLine: currentLyricIndex + 1,
      totalLines: lyricsUnit.lyrics.length,
    });
  }, [currentLyricIndex]);

  useEffect(() => {
    console.log("1. isLineFinished", isLineFinished);
    if (!isLineFinished) return;
    handleSaveUnitPronunciationCourseLog();
    setCurrentProgress((prev) => {
      const newProgress = [...prev];
      newProgress[currentLyricIndex] += 1;
      return newProgress;
    });
  }, [isLineFinished]);

  useEffect(() => {
    if (!isLessonFinished) return;
    if (!isCurrentProgressFull) return;
    if (!lyricsUnit) return;

    const zeroes = new Array(lyricsUnit.lyrics.length).fill(0);
    const pronunciationLogsObj = JSON.parse(
      localStorage.getItem(logsName) || "{}"
    );
    const lastLogDay = pronunciationLogsObj[lyricsUnit.meta.slug].logs.at(-1);
    const lastLogDayNumber = Number(Object.keys(lastLogDay)[0]);
    const lastLogDate = lastLogDay[lastLogDayNumber].date;
    const currentProgress =
      pronunciationLogsObj[lyricsUnit.meta.slug].currentProgress;

    if (lastLogDate !== today) {
      pronunciationLogsObj[lyricsUnit.meta.slug].logs.push({
        [lastLogDayNumber + 1]: {
          reps: currentProgress,
          dayName: dayName,
          date: today,
        },
      });
    } else {
      lastLogDay[lastLogDayNumber].reps.push(currentProgress);
    }
    pronunciationLogsObj[lyricsUnit.meta.slug].currentIndex = 0;
    pronunciationLogsObj[lyricsUnit.meta.slug].currentProgress = zeroes;
    localStorage.setItem(logsName, JSON.stringify(pronunciationLogsObj));
  }, [isLessonFinished, isCurrentProgressFull]);

  useEffect(() => {
    if (!lyricsUnit) return;
    if (showAutoPausePlayer) return;
    lyricRefs.current[currentLyricIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentLyricIndex, showAutoPausePlayer]);

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
    // setIsLineFinished(false);
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
      console.log("handleLineFinished");
      audioElement.pause();
      setIsPlaying(false);
      setIsLineFinished(true);
      if (!isAutoPauseOn) {
        handleNextLine();
      }
    }, (lineDuration * 1000) / playbackRate);
  };

  const handleNextLine = () => {
    if (!lyricsUnit) return;
    if (currentLyricIndex === lyricsUnit.lyrics.length - 1) {
      const audioElement = audioRef.current;
      if (!audioElement) return;
      audioElement.pause();
      setIsPlaying(false);
      if (!isAutoPauseOn) {
        updateCurrentProgressToLocalStorage(lyricsUnit);
        setCurrentProgress((prev) => {
          const newProgress = [...prev];
          newProgress[currentLyricIndex] += 1;
          return newProgress;
        });
        setIsCurrentProgressFull(true);
      }
    } else {
      if (!isAutoPauseOn) {
        updateCurrentProgressToLocalStorage(lyricsUnit);
        setCurrentProgress((prev) => {
          const newProgress = [...prev];
          newProgress[currentLyricIndex] += 1;
          return newProgress;
        });
      }
      setCurrentLyricIndex((prevIndex) => prevIndex + 1);
    }
    setIsLineFinished(false);

    function updateCurrentProgressToLocalStorage(lyricsUnit: LyricsUnit) {
      const pronunciationLogs = localStorage.getItem(logsName);
      if (!pronunciationLogs) return;
      const pronunciationLogsObj = JSON.parse(pronunciationLogs);
      pronunciationLogsObj[lyricsUnit.meta.slug].currentIndex =
        currentLyricIndex;
      pronunciationLogsObj[lyricsUnit.meta.slug].currentProgress[
        currentLyricIndex
      ] += 1;
      localStorage.setItem(logsName, JSON.stringify(pronunciationLogsObj));
    }
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

    const zeroes = new Array(lyricsUnit.lyrics.length).fill(0);
    const pronunciationLogs = localStorage.getItem(logsName);

    if (!pronunciationLogs) {
      localStorage.setItem(
        logsName,
        JSON.stringify({
          [lyricsUnit.meta.slug]: {
            currentIndex: currentLyricIndex,
            currentProgress: zeroes,
            logs: [{ 1: { reps: [], dayName: dayName, date: today } }],
          },
        })
      );
      return;
    }

    const pronunciationLogsObj = JSON.parse(pronunciationLogs);
    if (isLineFinished) {
      pronunciationLogsObj[lyricsUnit.meta.slug].currentIndex =
        currentLyricIndex;
      pronunciationLogsObj[lyricsUnit.meta.slug].currentProgress[
        currentLyricIndex
      ] += 1;
    }

    const isCurrentProgressFull = pronunciationLogsObj[
      lyricsUnit.meta.slug
    ].currentProgress.every((progress: number) => progress >= 1);
    if (isCurrentProgressFull) {
      setIsCurrentProgressFull(true);
    }

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

  const addLessonMetaToContinueTrainingHistoryInLocalStorage = (
    unitId: string
  ) => {
    // TODO: create a new continue training history for first time ever user
    const continueTrainingHistory = localStorage.getItem(
      "continue-training-history"
    );
    if (!lyricsUnit) return;
    if (!continueTrainingHistory) {
      createContinueTrainingHistoryForFirstTimeUser(lyricsUnit, unitId);
    } else {
      updateContinueTrainingHistoryForExistingUser(
        continueTrainingHistory,
        unitId,
        lyricsUnit
      );
    }

    function updateContinueTrainingHistoryForExistingUser(
      continueTrainingHistory: string,
      unitId: string,
      lyricsUnit: LyricsUnit
    ) {
      const continueTrainingHistoryObj = JSON.parse(continueTrainingHistory);
      if (continueTrainingHistoryObj[unitId]) {
        continueTrainingHistoryObj[unitId].lastTrainingSession =
          new Date().getTime();
      } else {
        continueTrainingHistoryObj[unitId] = {
          meta: lyricsUnit.meta,
          lastTrainingSession: new Date().getTime(),
        };
      }
      localStorage.setItem(
        "continue-training-history",
        JSON.stringify(continueTrainingHistoryObj)
      );
    }

    function createContinueTrainingHistoryForFirstTimeUser(
      lyricsUnit: LyricsUnit,
      unitId: string
    ) {
      const continueTrainingHistoryObj: {
        [unitId: string]: {
          meta: {
            course: string;
            title: string;
            id: string;
            vietnamese?: string;
            duration?: number;
            thumbnail?: string;
          };
          lastTrainingSession: number;
        };
      } = {
        [unitId]: {
          meta: {
            course: lyricsUnit.meta.course,
            title: lyricsUnit.meta.title,
            id: lyricsUnit.meta.slug,
            vietnamese: lyricsUnit.meta.vietnamese,
            duration: lyricsUnit.meta.duration,
            thumbnail: lyricsUnit.meta.thumbnail,
          },
          lastTrainingSession: new Date().getTime(),
        },
      };
      localStorage.setItem(
        "continue-training-history",
        JSON.stringify(continueTrainingHistoryObj)
      );
    }
  };

  const handleAutoPause = () => {
    setIsAutoPauseOn((prev) => !prev);
  };

  const changePlaybackSpeed = () => {
    if (!audioRef.current) return;
    const newPlaybackRate =
      playbackRate >= 2 ? 0.5 : Number((playbackRate + 0.1).toFixed(1));
    setPlaybackRate(newPlaybackRate);
    audioRef.current.playbackRate = newPlaybackRate;
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
    lyricProgress,
    isCurrentProgressFull,
    setIsLessonFinished,
    isLessonFinished,
    lyricRefs,
    showAutoPausePlayer,
    setShowAutoPausePlayer,
    setCurrentLyricIndex,
    isAutoPauseOn,
    handleAutoPause,
    currentProgress,
    playbackRate,
    changePlaybackSpeed,
  };
}
