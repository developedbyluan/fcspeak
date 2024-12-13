import { Square, Ear } from "lucide-react";
import type { Lyric } from "@/types/lyric";

type VoiceRecorderProps = {
  isRecording: boolean;
  stopRecording: () => void;
  stopTranscribing: () => void;
  text: string;
  currentLyric: Lyric;
};

export default function VoiceRecorder({
  isRecording,
  stopRecording,
  stopTranscribing,
  text,
  currentLyric,
}: VoiceRecorderProps) {
  const stopRecordingAndTranscribing = () => {
    stopRecording();
    stopTranscribing();
  };
  return (
    <div className="absolute z-50 inset-0 bg-slate-900 flex flex-col justify-evenly items-center p-7">
      <p className="text-2xl font-bold text-white text-center">
        {text || "Your speech will appear here..."}
      </p>
      <button
        onClick={stopRecordingAndTranscribing}
        className={`
          relative w-20 h-20 rounded-full 
          bg-red-500 animate-pulse
          transition-colors duration-1000 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
        aria-label="Stop recording"
      >
        <Square className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </button>
      <p className="text-lg font-bold text-zinc-400 text-center">
        {currentLyric.text}
      </p>
    </div>
  );
}
