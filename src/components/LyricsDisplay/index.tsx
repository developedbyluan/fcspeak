import { ScrollArea } from "@/components/ui/scroll-area";
import type { Lyric } from "@/types/lyric";
import { LucideCheckCircle } from "lucide-react";

type LyricsDisplayProps = {
  lyricsData: Lyric[];
  currentLyricIndex: number;
  lyricRefs: React.RefObject<HTMLDivElement[]>;
  onShowAutoPausePlayer: (index: number) => void;
  currentProgress: number[];
  handleSync: () => void;
};

export default function LyricsDisplay({
  lyricsData,
  currentLyricIndex,
  lyricRefs,
  onShowAutoPausePlayer,
  currentProgress,
  handleSync,
}: LyricsDisplayProps) {
  return (
    <ScrollArea className="min-h-svh rounded-md border p-4">
      {lyricsData.map((line, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el && lyricRefs.current) {
              lyricRefs.current[index] = el;
            }
          }}
          className={`mb-4 cursor-pointer transition-colors duration-200 ${
            index === currentLyricIndex
              ? "bg-yellow-100 p-2 rounded"
              : "hover:bg-gray-100 p-2 rounded"
          }`}
          onClick={() => {
            onShowAutoPausePlayer(index);
            handleSync();
          }}
        >
          <div>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              {currentProgress[index] > 0 && (
                <LucideCheckCircle stroke="green" size={16} />
              )}
              {index + 1} / {lyricsData.length}
            </span>
            <p className="font-medium">{line.text}</p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
