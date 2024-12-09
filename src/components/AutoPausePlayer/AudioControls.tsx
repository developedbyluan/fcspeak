"use client";
import { LucidePlay, LucideSkipForward, Mic, SkipForwardIcon } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  isLineFinished: boolean;
  onTogglePlayPause: () => void;
  onNextLine: () => void;
  disabled?: boolean;
}

export default function AudioControls({
  isPlaying,
  isLineFinished,
  onTogglePlayPause,
  onNextLine,
  disabled = false,
}: AudioControlsProps) {
  const ariaLabel = isPlaying ? "Pause" : "Click to play";
  return (
    <div className="mx-auto bg-gradient-to-r from-zinc-700 via-zinc-700 to-zinc-600 rounded-lg px-3 py-5 flex justify-between items-center">
      <button>
        <Mic stroke="white" size={32} />
      </button>
      <button
        onClick={onTogglePlayPause}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        <LucidePlay stroke="white" fill="white" size={32} />
      </button>
      <button
        onClick={onNextLine}
        disabled={disabled}
      >
        <LucideSkipForward stroke="white" fill="white" size={32} />
      </button>
    </div>
  );
}
