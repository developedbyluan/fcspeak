import { useEffect, useState } from "react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { unit1 } from "@/data/pronunciation/unit1-lyrics-data";
import AudioFileInput from "@/components/AudioPlayer/AudioFileInput";
import { AudioFileInputSkeleton } from "@/components/AudioPlayer/AudioFileInputSkeleton";
import AutoPausePlayer from "../AutoPausePlayer";
import { LyricsUnit } from "@/types/lyric";

import ProgressBar from "../AudioPlayer/ProgressBar";

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
  } = useAudioPlayer(lyricsUnit);

  const currentLyric = lyricsUnit?.lyrics[currentLyricIndex];

  const handleShowTranslation = () => {
    setShowTranslation((prev) => !prev);
  };

  const handleShowIPA = () => {
    setShowIPA((prev) => !prev);
  };

  return (
    <div>
      {audioSrc && currentLyric ? (
        <>
          <audio ref={audioRef} src={audioSrc} />
          <ProgressBar audioProgress={audioProgress} />
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
          />
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
  );
}
