import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LessonCard from "./LessonCard";
import { LyricsUnitMetaWithId } from "@/types/lyric";

type LessonGridProps = {
  lessons: LyricsUnitMetaWithId[];
  isVertical: boolean;
};

export default function LessonGrid({ lessons, isVertical }: LessonGridProps) {
  return (
    <ScrollArea
      className={`w-full rounded-md border ${
        isVertical ? "max-h-[600px]" : "whitespace-nowrap"
      }`}
    >
      <div
        className={`${
          isVertical ? "flex flex-col space-y-4" : "flex w-max space-x-4"
        } p-4`}
      >
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} isVertical={isVertical} />
        ))}
      </div>
      <ScrollBar orientation={isVertical ? "vertical" : "horizontal"} />
    </ScrollArea>
  );
}
