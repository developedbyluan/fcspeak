"use client";

import { useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

import { LyricsUnitMeta } from "@/types/lyric";

type AudioFileInputProps = {
  onAudioFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lyricsUnitMeta: LyricsUnitMeta | null;
};

export default function AudioFileInput({
  onAudioFileChange,
  lyricsUnitMeta,
}: AudioFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="w-3/4 max-w-md mx-auto mt-10 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border-2 border-neutral-200 dark:border-neutral-800">
      <CardHeader>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          {lyricsUnitMeta?.course}
        </p>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-center font-bold text-neutral-800 dark:text-neutral-300">
            {lyricsUnitMeta?.title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400">
          {lyricsUnitMeta?.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                id="audio-file-input"
                type="file"
                accept="audio/mpeg"
                onChange={onAudioFileChange}
                className="hidden"
              />
              <Button
                onClick={() => inputRef.current?.click()}
                variant="outline"
                className="w-full border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                Choose {lyricsUnitMeta?.fileName}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
