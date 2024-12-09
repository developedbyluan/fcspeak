import useAudioPlayer from "@/hooks/useAudioPlayer";
import { unit1 } from "@/data/pronunciation/unit1-lyrics-data";
import AudioFileInput from "@/components/AudioPlayer/AudioFileInput";
import AudioControls from "../AutoPausePlayer/AudioControls";

export default function PronunciationCourseUnit() {
  const {
    audioSrc,
    audioRef,
    handleAudioFileChange,
    isPlaying,
    isLineFinished,
    handleAudioTogglePlayPause,
    lyricsUnitMeta,
  } = useAudioPlayer(unit1);
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
