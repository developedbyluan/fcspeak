import { LyricsUnit } from "./lyric";

type FakeSupabaseData = {
  pronunciation: {
    [key: string]: LyricsUnit;
  };
};

export type { FakeSupabaseData };
