"use client";
import { Button } from "@/components/ui/button";
import { PauseIcon, Repeat1Icon, SkipForwardIcon } from "lucide-react";

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
  return (
    <div className="mx-auto bg-gradient-to-r from-zinc-700 via-zinc-700 to-zinc-600 rounded-lg px-3 py-5 flex justify-between items-center">
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
            <Repeat1Icon className="mr-2 h-4 w-4" />
            Replay
          </>
        )}
      </Button>
      <Button onClick={onNextLine} disabled={disabled} variant="secondary">
        <SkipForwardIcon className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
}
