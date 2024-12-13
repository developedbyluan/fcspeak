import { Ear } from "lucide-react";

type PlayVoiceRecordingProps = {
  recordedAudioURL: string;
  recordedAudioRef: React.RefObject<HTMLAudioElement>;
  toggleRecordedAudioPlaying: () => void;
  isRecordedAudioPlaying: boolean;
};

export default function PlayVoiceRecording({
  recordedAudioURL,
  recordedAudioRef,
  toggleRecordedAudioPlaying,
  isRecordedAudioPlaying,
    }: PlayVoiceRecordingProps) {
  const playAudio = () => {
    if (!recordedAudioRef.current) return;
    toggleRecordedAudioPlaying();
  };
  return (
    <>
      <audio src={recordedAudioURL} ref={recordedAudioRef} />
      <button
        className={`
          relative w-20 h-20 rounded-full 
          bg-gradient-to-r from-zinc-700 to-zinc-600
          transition-colors duration-1000 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 hover:bg-gradient-to-r hover:from-zinc-600 hover:to-zinc-500
          ${isRecordedAudioPlaying ? 'animate-pulse' : ''}
        `}
        aria-label="Play recording"
        onClick={playAudio}
      >
        <Ear
          className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          stroke="red"
        />
      </button>
    </>
  );
}
