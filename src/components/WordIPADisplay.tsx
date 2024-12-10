import { cn } from "@/lib/utils";
import { WordIPA, WordIPADisplayProps} from "@/types/word"

export default function WordIPADisplay({
  wordIPAs,
  fontSize = "2xl",
  showIPA = true,
}: WordIPADisplayProps) {
  const fontSizeClasses = {
    large: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  };

  return (
    <div className="flex flex-row flex-wrap gap-x-4">
      {wordIPAs.map(({ id, text, ipa }) => {
        return (
          <div key={id} className="flex flex-col items-center gap-y-1 mb-4">
            {showIPA && <span className="text-gray-500 text-sm">{ipa}</span>}
            <span className={cn("font-medium", fontSizeClasses[fontSize])}>
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
