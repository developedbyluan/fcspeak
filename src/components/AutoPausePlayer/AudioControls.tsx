// src/components/AudioPlayer/AudioControls.tsx
"use client";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, RotateCcwIcon } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  isLineFinished: boolean;
  onTogglePlayPause: () => void;
  disabled?: boolean;
}

export default function AudioControls({
  isPlaying,
  isLineFinished,
  onTogglePlayPause,
  disabled = false,
}: AudioControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        onClick={onTogglePlayPause}
        className="flex-1 flex items-center justify-center"
        disabled={disabled}
        variant={isLineFinished ? "secondary" : "default"}
      >
        {isPlaying ? (
          <>
            <PauseIcon className="mr-2 h-4 w-4" />
            Pause
          </>
        ) : (
          <>
            <PlayIcon className="mr-2 h-4 w-4" />
            {isLineFinished ? "Play Next" : "Play"}
          </>
        )}
      </Button>
    </div>
  );
}
