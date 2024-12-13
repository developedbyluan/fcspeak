type Lyric = {
  text: string;
  ipa: string;
  translation: string;
  imgUrl: string;
  altText: string;
  imgCredit: string;
  type: string;
  startTime: number;
  endTime: number;
};

type LyricsUnitMeta = {
  title: string;
  description: string;
  fileName: string;
  course: string;
  slug: string;
  vietnamese?: string;
  duration?: number;
  thumbnail?: string;
};

type LyricsUnit = {
  meta: LyricsUnitMeta;
  lyrics: Lyric[];
};

type LyricsUnitMetaWithId = LyricsUnitMeta & {
  id: number;
};

export type { Lyric, LyricsUnit, LyricsUnitMeta, LyricsUnitMetaWithId };
