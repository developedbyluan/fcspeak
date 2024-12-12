"use client";
import {
  CalendarSync,
  ChevronDown,
  Languages,
  LucidePlay,
  LucideSkipForward,
  MessageSquareQuote,
  Mic,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type AudioControlsProps = {
  isPlaying: boolean;
  isLineFinished: boolean;
  onTogglePlayPause: () => void;
  onNextLine: () => void;
  disabled?: boolean;
  onShowTranslation: () => void;
  showTranslation: boolean;
  onShowIPA: () => void;
  showIPA: boolean;
  onGotoPreviousSessionLine: () => void;
  onHideAutoPausePlayer: () => void;
};

export default function AudioControls({
  isPlaying,
  isLineFinished,
  onTogglePlayPause,
  onNextLine,
  disabled = false,
  onShowTranslation,
  showTranslation,
  onShowIPA,
  showIPA,
  onGotoPreviousSessionLine,
  onHideAutoPausePlayer,
}: AudioControlsProps) {
  const [isSynced, setIsSynced] = useState(false);
  const ariaLabel = isPlaying ? "Pause" : "Click to play";
  return (
    <AnimatePresence>
      {!isPlaying ? (
        <>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-3 left-1 flex items-center gap-2 rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-600"
          >
            <button
              className="pl-4 pr-4 py-3"
              aria-label="Hide the AutoPause player"
              onClick={onHideAutoPausePlayer}
            >
              <ChevronDown stroke="white" size={32} />
            </button>
            {!isSynced && (
              <button
                className="pl-4 pr-4 py-3 bg-zinc-700 rounded-tr-xl rounded-br-xl"
                onClick={() => {
                  onGotoPreviousSessionLine();
                  setIsSynced(true);
                }}
                aria-label="Go to previous session line"
              >
                <CalendarSync stroke="white" strokeWidth={0.75} size={32} />
              </button>
            )}
          </motion.div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-3 right-1 flex items-center gap-7 px-4 py-3 rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-600"
          >
            <button onClick={onShowIPA} aria-label="Show translation">
              <MessageSquareQuote
                stroke="white"
                strokeWidth={showIPA ? 2 : 0.75}
                size={32}
              />
            </button>
            <button onClick={onShowTranslation} aria-label="Show translation">
              <Languages
                stroke="white"
                strokeWidth={showTranslation ? 2 : 0.75}
                size={32}
              />
            </button>
          </motion.div>
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
