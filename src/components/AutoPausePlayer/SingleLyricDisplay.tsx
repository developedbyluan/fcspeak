import { Lyric } from "@/types/lyric";
import { cn } from "@/lib/utils";

type LyricsDisplayProps = {
  currentLyric: Lyric | null;
  fontSize?: "large" | "xl" | "2xl" | "3xl";
  showTranslation: boolean;
  showIPA: boolean;
};

export default function SingleLyricDisplay({
  currentLyric,
  fontSize = "3xl",
  showTranslation,
  showIPA,
}: LyricsDisplayProps) {
  const fontSizeClasses = {
    large: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl leading-loose",
  };

  return (
    <div className="mt-32 px-4">
      <div className="space-y-2">
        <p className={`font-medium ${fontSizeClasses[fontSize]}`}>
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
