import { useEffect, useState } from "react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import AudioFileInput from "@/components/AudioPlayer/AudioFileInput";
import { AudioFileInputSkeleton } from "@/components/AudioPlayer/AudioFileInputSkeleton";
import AutoPausePlayer from "../AutoPausePlayer";
import { LyricsUnit } from "@/types/lyric";

import ProgressBar from "../AudioPlayer/ProgressBar";
import LessonComplete from "./LessonComplete";

import LyricsDisplay from "../LyricsDisplay";
import { toast } from "@/hooks/use-toast";

import { fakeSupabaseData } from "@/data/fake-supabase";

type PronunciationCourseUnitProps = {
  unitId: string;
};

export default function PronunciationCourseUnit({ unitId }: PronunciationCourseUnitProps) {
  const [lyricsUnit, setLyricsUnit] = useState<LyricsUnit | null>(null);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [showIPA, setShowIPA] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLyricsUnit(fakeSupabaseData.pronunciation[unitId]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const {
    audioSrc,
    audioRef,
    handleAudioFileChange,
    isPlaying,
    isLineFinished,
    handleAudioTogglePlayPause,
    lyricsUnitMeta,
    currentLyricIndex,
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
  } = useAudioPlayer(lyricsUnit);

  const currentLyric = lyricsUnit?.lyrics[currentLyricIndex];

  const handleShowTranslation = () => {
    setShowTranslation((prev) => !prev);
  };

  const handleShowIPA = () => {
    setShowIPA((prev) => !prev);
  };
  const handleHideAutoPausePlayer = () => {
    setShowAutoPausePlayer(false);
  };

  const handleShowAutoPausePlayer = (index: number) => {
    setShowAutoPausePlayer(true);
    setCurrentLyricIndex(index);
  };

  const handleNextLineWithToast = () => {
    if (!lyricsUnit) return;
    if (currentLyricIndex === lyricsUnit?.lyrics.length - 1) {
      toast({
        description: "This is the last line of the lesson!",
        variant: "destructive",
      });
    }
    handleNextLine();
  };

  return (
    <>
      {!isLessonFinished ? (
        <div>
          {audioSrc && currentLyric ? (
            <>
              <audio ref={audioRef} src={audioSrc} />
              <ProgressBar audioProgress={audioProgress} />
              {showAutoPausePlayer ? (
                <AutoPausePlayer
                  currentLyric={currentLyric}
                  isPlaying={isPlaying}
                  isLineFinished={isLineFinished}
                  onTogglePlayPause={handleAudioTogglePlayPause}
                  onNextLine={handleNextLineWithToast}
                  onShowTranslation={handleShowTranslation}
                  showTranslation={showTranslation}
                  onShowIPA={handleShowIPA}
                  showIPA={showIPA}
                  onGotoPreviousSessionLine={gotoPreviousSessionLine}
                  lyricProgress={lyricProgress}
                  onHideAutoPausePlayer={handleHideAutoPausePlayer}
                  isAutoPauseOn={isAutoPauseOn}
                  handleAutoPause={handleAutoPause}
                  playbackRate={playbackRate}
                  changePlaybackSpeed={changePlaybackSpeed}
                  isCurrentProgressFull={isCurrentProgressFull}
                  setIsLessonFinished={setIsLessonFinished}
                />
              ) : (
                <LyricsDisplay
                  lyricsData={lyricsUnit?.lyrics}
                  currentLyricIndex={currentLyricIndex}
                  lyricRefs={lyricRefs}
                  onShowAutoPausePlayer={handleShowAutoPausePlayer}
                  currentProgress={currentProgress}
                />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-svh">
              {lyricsUnitMeta ? (
                <AudioFileInput
                  onAudioFileChange={handleAudioFileChange}
                  lyricsUnitMeta={lyricsUnitMeta}
                />
              ) : (
                <AudioFileInputSkeleton />
              )}
            </div>
          )}
        </div>
      ) : (
        <LessonComplete unitId={lyricsUnitMeta?.slug || ''} />
      )}
    </>
  );
}
