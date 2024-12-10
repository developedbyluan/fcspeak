type WordIPA = {
  id: number;
  text: string;
  ipa: string;
};

type WordIPADisplayProps = {
  wordIPAs: WordIPA[];
  fontSize?: "large" | "xl" | "2xl" | "3xl";
  showIPA?: boolean;
};

export type { WordIPA, WordIPADisplayProps };
