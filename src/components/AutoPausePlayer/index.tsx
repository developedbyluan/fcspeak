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
  onShowIPA: () => void;
  showIPA: boolean;
};

export default function AutoPausePlayer({
  currentLyric,
  isPlaying,
  isLineFinished,
  onTogglePlayPause,
  onNextLine,
  onShowTranslation,
  showTranslation,
  onShowIPA,
  showIPA,
}: AutoPausePlayerProps) {
  return (
    <div>
      <SingleLyricDisplay
        currentLyric={currentLyric}
        showTranslation={showTranslation}
        showIPA={showIPA}
      />
      <AudioControls
        isPlaying={isPlaying}
        isLineFinished={isLineFinished}
        onTogglePlayPause={onTogglePlayPause}
        onNextLine={onNextLine}
        onShowTranslation={onShowTranslation}
        showTranslation={showTranslation}
        onShowIPA={onShowIPA}
        showIPA={showIPA}
      />
    </div>
  );
}
