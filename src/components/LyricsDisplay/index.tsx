import { ScrollArea } from "@/components/ui/scroll-area";
import type { Lyric, LyricsUnitMeta } from "@/types/lyric";
import { LucideCheckCircle } from "lucide-react";
import Link from "next/link";

type LyricsDisplayProps = {
  lyricsData: Lyric[];
  currentLyricIndex: number;
  lyricRefs: React.RefObject<HTMLDivElement[]>;
  onShowAutoPausePlayer: (index: number) => void;
  currentProgress: number[];
  handleSync: () => void;
  lyricsUnitMeta: LyricsUnitMeta | null;
};

export default function LyricsDisplay({
  lyricsData,
  currentLyricIndex,
  lyricRefs,
  onShowAutoPausePlayer,
  currentProgress,
  handleSync,
  lyricsUnitMeta,
}: LyricsDisplayProps) {
  return (
    <>
      {lyricsUnitMeta && (
        <h1 className="text-2xl font-bold text-center mt-4">
          {lyricsUnitMeta?.title}
        </h1>
      )}
      <div className="flex justify-center mb-4">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Go back to All Courses
        </Link>
      </div>
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
    </>
  );
}
