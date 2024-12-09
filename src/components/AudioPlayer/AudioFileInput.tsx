"use client";

import { LyricsUnitMeta } from "@/types/lyric";

type AudioFileInputProps = {
  onAudioFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lyricsUnitMeta: LyricsUnitMeta | null;
};

export default function AudioFileInput({
  onAudioFileChange,
  lyricsUnitMeta,
}: AudioFileInputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="audio-upload"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {lyricsUnitMeta
          ? `Select Audio File named ${lyricsUnitMeta.fileName} for ${lyricsUnitMeta.title}`
          : "Select Audio File"}
      </label>
      <input
        id="audio-upload"
        type="file"
        accept="audio/mpeg"
        onChange={onAudioFileChange}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
    </div>
  );
}
