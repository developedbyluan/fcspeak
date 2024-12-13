import { Square, Ear } from "lucide-react";

type VoiceRecorderProps = {
  isRecording: boolean;
  stopRecording: () => void;
  stopTranscribing: () => void;
  text: string;
};

export default function VoiceRecorder({
  isRecording,
  stopRecording,
  stopTranscribing,
  text,
}: VoiceRecorderProps) {
  const stopRecordingAndTranscribing = () => {
    stopRecording();
    stopTranscribing();
  };
  return (
    <div className="absolute z-50 inset-0 bg-slate-900 flex flex-col justify-evenly items-center">
      <button
        onClick={stopRecordingAndTranscribing}
        className={`
          relative w-20 h-20 rounded-full 
          ${isRecording ? "bg-red-500 animate-pulse" : "bg-blue-500"}
          transition-colors duration-1000 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
        aria-label={isRecording ? "Stop recording" : "Play recording"}
      >
        {isRecording ? (
          <Square className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <Ear className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </button>
      <p className="text-2xl font-bold text-white">
        {text || "Your speech will appear here..."}
      </p>
    </div>
  );
}
