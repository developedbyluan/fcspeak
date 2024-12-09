import { useEffect, useState, useRef } from "react";
import { LyricsUnit } from "@/types/lyric";

export default function useAudioPlayer(lyricsUnit: LyricsUnit) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isLineFinished, setIsLineFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
}
