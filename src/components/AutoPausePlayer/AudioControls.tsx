"use client";
import { ChevronDown, LucidePlay, LucideSkipForward, Mic } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

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
    <AnimatePresence>
      {!isPlaying ? (
        <>
          <motion.button
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-3 left-1 px-4 py-3 rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-600"
          >
            <ChevronDown stroke="white" size={32} />
          </motion.button>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed w-full bottom-2 px-1"
          >
            <div className="mx-auto bg-gradient-to-r from-zinc-700 via-zinc-700 to-zinc-600 rounded-xl px-3 py-5 flex justify-between items-center">
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
              <button onClick={onNextLine} disabled={disabled}>
                <LucideSkipForward stroke="white" fill="white" size={32} />
              </button>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="fixed z-50 inset-0"></div>
      )}
    </AnimatePresence>
  );
}
