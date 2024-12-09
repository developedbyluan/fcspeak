import { Lyric } from "@/types/lyric";
import { cn } from "@/lib/utils";

type LyricsDisplayProps = {
  currentLyric: Lyric | null;
  isPlaying: boolean;
  isLineFinished: boolean;
  fontSize?: "large" | "xl" | "2xl";
  showTranslation: boolean;
  showIPA: boolean;
};

export default function SingleLyricDisplay({
  currentLyric,
  isPlaying,
  isLineFinished,
  fontSize = "2xl",
  showTranslation,
  showIPA,
}: LyricsDisplayProps) {
  const fontSizeClasses = {
    large: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };
  const getTextColorClass = () => {
    if (isPlaying) return "text-blue-600";
    if (isLineFinished) return "text-green-600";
    return "text-gray-900";
  };

  return (
    <div className="mt-32 px-4">
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

      <div className="mt-4 space-y-2">
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

      <div className="space-y-2">
        {showIPA && (
          <>
            <h3 className="text-sm font-medium text-gray-500">IPA</h3>
            <p className="text-gray-700">{currentLyric?.ipa}</p>
          </>
        )}
      </div>
    </div>
  );
}
