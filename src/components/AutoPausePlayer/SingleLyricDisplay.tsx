import { Lyric } from "@/types/lyric";
import { cn } from "@/lib/utils";
import WordIPADisplay from "../WordIPADisplay";

type LyricsDisplayProps = {
  currentLyric: Lyric | null;
  fontSize?: "large" | "xl" | "2xl" | "3xl";
  showTranslation: boolean;
  showIPA: boolean;
};

export default function SingleLyricDisplay({
  currentLyric,
  showTranslation,
  showIPA,
}: LyricsDisplayProps) {

  const convertLyricToWordIPA = (lyric: Lyric) => {
    const {text, ipa} = lyric;
    const words = text.split(" ");
    const ipaWords = ipa.split(" ");
    const wordIPAs = words.map((word, index) => ({
      id: index,
      text: word,
      ipa: ipaWords[index],
    }));

    return wordIPAs;
  };

  return (
    <div className="mt-32 px-4">
      <div className="space-y-2">
        {currentLyric && (
          <WordIPADisplay
            wordIPAs={convertLyricToWordIPA(currentLyric)}
            showIPA={showIPA}
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {showTranslation && (
          <>
            <h3 className="text-sm font-medium text-gray-500">Translation</h3>
            <p className="text-gray-700">{currentLyric?.translation}</p>
          </>
        )}
      </div>

    </div>
  );
}
