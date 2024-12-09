import SingleLyricDisplay from "./SingleLyricDisplay";
import AudioControls from "./AudioControls";
import { Lyric } from "@/types/lyric";

type AutoPausePlayerProps = {
  currentLyric: Lyric;
  isPlaying: boolean;
  isLineFinished: boolean;
  onTogglePlayPause: () => void;
  onNextLine: () => void;
  onShowTranslation: () => void;
  showTranslation: boolean;
};

export default function AutoPausePlayer({
  currentLyric,
  isPlaying,
  isLineFinished,
  onTogglePlayPause,
  onNextLine,
  onShowTranslation,
  showTranslation,
}: AutoPausePlayerProps) {
  return (
    <div>
      <SingleLyricDisplay
        currentLyric={currentLyric}
        isPlaying={isPlaying}
        isLineFinished={isLineFinished}
        showTranslation={showTranslation}
      />
      <AudioControls
        isPlaying={isPlaying}
        isLineFinished={isLineFinished}
        onTogglePlayPause={onTogglePlayPause}
        onNextLine={onNextLine}
        onShowTranslation={onShowTranslation}
        showTranslation={showTranslation}
      />
    </div>
  );
}
