import SingleLyricDisplay from "./SingleLyricDisplay";
import AudioControls from "./AudioControls";
import { Lyric } from "@/types/lyric";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";

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
  onGotoPreviousSessionLine: () => void;
  lyricProgress: {
    currentLine: number;
    totalLines: number;
  };
  onHideAutoPausePlayer: () => void;
  isAutoPauseOn: boolean;
  handleAutoPause: () => void;
  playbackRate: number;
  changePlaybackSpeed: () => void;
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
  onGotoPreviousSessionLine,
  lyricProgress,
  onHideAutoPausePlayer,
  isAutoPauseOn,
  handleAutoPause,
  playbackRate,
  changePlaybackSpeed,
}: AutoPausePlayerProps) {
  const { startRecording, stopRecording, isRecording, audioURL, startTranscribing, stopTranscribing, text } = useVoiceRecorder();
  return (
    <div>
      <SingleLyricDisplay
        currentLyric={currentLyric}
        showTranslation={showTranslation}
        showIPA={showIPA}
        lyricProgress={lyricProgress}
      />
      {audioURL && <audio src={audioURL} controls />}
      {text && <p>{text}</p>}
      <AudioControls
        isPlaying={isPlaying}
        isLineFinished={isLineFinished}
        onTogglePlayPause={onTogglePlayPause}
        onNextLine={onNextLine}
        onShowTranslation={onShowTranslation}
        showTranslation={showTranslation}
        onShowIPA={onShowIPA}
        showIPA={showIPA}
        onGotoPreviousSessionLine={onGotoPreviousSessionLine}
        onHideAutoPausePlayer={onHideAutoPausePlayer}
        isAutoPauseOn={isAutoPauseOn}
        handleAutoPause={handleAutoPause}
        playbackRate={playbackRate}
        changePlaybackSpeed={changePlaybackSpeed}
        startRecording={startRecording}
        stopRecording={stopRecording}
        isRecording={isRecording}
        startTranscribing={startTranscribing}
        stopTranscribing={stopTranscribing}
      />
    </div>
  );
}
