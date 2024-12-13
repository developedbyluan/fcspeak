import SingleLyricDisplay from "./SingleLyricDisplay";
import AudioControls from "./AudioControls";
import { Lyric } from "@/types/lyric";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";
import VoiceRecorder from "../VoiceRecorder";
import PlayVoiceRecording from "../PlayVoiceRecording";
import { useEffect } from "react";

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
  isCurrentProgressFull: boolean;
  setIsLessonFinished: (value: boolean) => void;
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
  isCurrentProgressFull,
  setIsLessonFinished,
}: AutoPausePlayerProps) {
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordedAudioURL,
    startTranscribing,
    stopTranscribing,
    text,
    recordedAudioRef,
    revokeRecordedAudioURL,
    toggleRecordedAudioPlaying,
    isRecordedAudioPlaying,
  } = useVoiceRecorder();

  return (
    <div>
      <SingleLyricDisplay
        currentLyric={currentLyric}
        showTranslation={showTranslation}
        showIPA={showIPA}
        lyricProgress={lyricProgress}
      />
      {isRecording ? (
        <VoiceRecorder
          currentLyric={currentLyric}
          isRecording={isRecording}
          stopRecording={stopRecording}
          stopTranscribing={stopTranscribing}
          text={text}
        />
      ) : (
        <div className="absolute inset-0 left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          {recordedAudioURL && (
            <PlayVoiceRecording
              recordedAudioURL={recordedAudioURL}
              recordedAudioRef={recordedAudioRef}
              toggleRecordedAudioPlaying={toggleRecordedAudioPlaying}
              isRecordedAudioPlaying={isRecordedAudioPlaying}
            />
          )}
        </div>
      )}
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
        revokeRecordedAudioURL={revokeRecordedAudioURL}
        isRecordedAudioPlaying={isRecordedAudioPlaying}
        toggleRecordedAudioPlaying={toggleRecordedAudioPlaying}
        isCurrentProgressFull={isCurrentProgressFull}
        setIsLessonFinished={setIsLessonFinished}
      />
    </div>
  );
}
