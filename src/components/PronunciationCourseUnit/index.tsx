import { useEffect, useState } from "react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { unit1 } from "@/data/pronunciation/unit1-lyrics-data";
import AudioFileInput from "@/components/AudioPlayer/AudioFileInput";
import { AudioFileInputSkeleton } from "@/components/AudioPlayer/AudioFileInputSkeleton";
import AutoPausePlayer from "../AutoPausePlayer";
import { LyricsUnit } from "@/types/lyric";

import ProgressBar from "../AudioPlayer/ProgressBar";
import LessonComplete from "./LessonComplete";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

import LyricsDisplay from "../LyricsDisplay";

export default function PronunciationCourseUnit() {
  const [lyricsUnit, setLyricsUnit] = useState<LyricsUnit | null>(null);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [showIPA, setShowIPA] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLyricsUnit(unit1);
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
                  onNextLine={handleNextLine}
                  onShowTranslation={handleShowTranslation}
                  showTranslation={showTranslation}
                  onShowIPA={handleShowIPA}
                  showIPA={showIPA}
                  onGotoPreviousSessionLine={gotoPreviousSessionLine}
                  lyricProgress={lyricProgress}
                  onHideAutoPausePlayer={handleHideAutoPausePlayer}
                  isAutoPauseOn={isAutoPauseOn}
                  handleAutoPause={handleAutoPause}
                />
              ) : (
                <LyricsDisplay
                  lyricsData={lyricsUnit?.lyrics}
                  currentLyricIndex={currentLyricIndex}
                  lyricRefs={lyricRefs}
                  onShowAutoPausePlayer={handleShowAutoPausePlayer}
                />
              )}
              {isCurrentProgressFull && !isPlaying && (
                <Button
                  onClick={() => setIsLessonFinished(true)}
                  className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  <CheckIcon className="w-4 h-4" />
                  Finish Lesson
                </Button>
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
        <LessonComplete />
      )}
    </>
  );
}
