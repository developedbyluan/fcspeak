import { Lyric } from "@/types/lyric";
import { cn } from "@/lib/utils";

type LyricsDisplayProps = {
  currentLyric: Lyric | null;
  isPlaying: boolean;
  isLineFinished: boolean;
  fontSize?: "small" | "medium" | "large";
  showTranslation: boolean;
};

export default function SingleLyricDisplay({
  currentLyric,
  isPlaying,
  isLineFinished,
  fontSize = "medium",
  showTranslation,
}: LyricsDisplayProps) {
  const fontSizeClasses = {
    small: "text-base",
    medium: "text-lg",
    large: "text-xl",
  };
  const getTextColorClass = () => {
    if (isPlaying) return "text-blue-600";
    if (isLineFinished) return "text-green-600";
    return "text-gray-900";
  };

  return (
    <div className="mt-6 space-y-4 p-4 rounded-lg bg-gray-50 transition-colors duration-200 hover:bg-gray-100">
      <div className="space-y-2">
        <p
          className={`font-medium ${
            fontSizeClasses[fontSize]
          } ${getTextColorClass()} 
          transition-colors duration-200`}
        >
          {currentLyric?.text}
        </p>
      </div>

      <div className="space-y-2">
        {showTranslation && (
          <>
            <h3 className="text-sm font-medium text-gray-500">Translation</h3>
            <p
              className={cn(
                "text-gray-700",
                fontSize === "large" ? "text-lg" : "text-base"
              )}
            >
              {currentLyric?.translation}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
