import { useEffect, useState } from "react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { unit1 } from "@/data/pronunciation/unit1-lyrics-data";
import AudioFileInput from "@/components/AudioPlayer/AudioFileInput";
import AutoPausePlayer from "../AutoPausePlayer";
import { LyricsUnit } from "@/types/lyric";

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
        <div>
          <audio ref={audioRef} src={audioSrc} />
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
          />
        </div>
      ) : (
        <AudioFileInput
          onAudioFileChange={handleAudioFileChange}
          lyricsUnitMeta={lyricsUnitMeta}
        />
      )}
    </div>
  );
}
