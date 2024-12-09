import { useEffect, useState } from "react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { unit1 } from "@/data/pronunciation/unit1-lyrics-data";
import AudioFileInput from "@/components/AudioPlayer/AudioFileInput";
import AudioControls from "../AutoPausePlayer/AudioControls";
import { LyricsUnit } from "@/types/lyric";

export default function PronunciationCourseUnit() {
  const [lyricsUnit, setLyricsUnit] = useState<LyricsUnit | null>(null);

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
  } = useAudioPlayer(lyricsUnit);


  return (
    <div>
      {audioSrc ? (
        <div>
          <audio ref={audioRef} src={audioSrc} />
          <AudioControls
            isPlaying={isPlaying}
            isLineFinished={isLineFinished}
            onTogglePlayPause={handleAudioTogglePlayPause}
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
