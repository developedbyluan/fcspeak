import { useEffect, useState, useRef } from "react";
import { LyricsUnit, LyricsUnitMeta } from "@/types/lyric";

export default function useAudioPlayer(lyricsUnit: LyricsUnit) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isLineFinished, setIsLineFinished] = useState(false);
  const [lyricsUnitMeta, setLyricsUnitMeta] = useState<LyricsUnitMeta | null>(
    null
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "audio/mpeg") {
      const objectUrl = URL.createObjectURL(file);
      setAudioSrc(objectUrl);

      setIsPlaying(false);
      setCurrentLyricIndex(0);
      setIsLineFinished(false);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleAudioTogglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (isLineFinished) {
          setCurrentLyricIndex((prevIndex) =>
            prevIndex < lyricsUnit.lyrics.length - 1 ? prevIndex + 1 : 0
          );
          setIsLineFinished(false);
        }
        audioRef.current.currentTime =
          lyricsUnit.lyrics[currentLyricIndex].startTime;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return {
    audioSrc,
    audioRef,
    handleAudioFileChange,
    isPlaying,
    isLineFinished,
    handleAudioTogglePlayPause,
    lyricsUnitMeta,
  };
}
