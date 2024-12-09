import { Card, CardContent } from "@/components/ui/card";
import { Lesson } from "@/types/lesson";
import Image from "next/image";

type LessonCardProps = {
  lesson: Lesson;
  isVertical: boolean;
};

export default function LessonCard({ lesson, isVertical }: LessonCardProps) {
  return (
    <>
      <Card
        key={lesson.id}
        className={isVertical ? "w-full" : "w-[250px] shrink-0"}
      >
        <CardContent className="p-4">
          <div
            className={`flex ${isVertical ? "flex-row space-x-4" : "flex-col"}`}
          >
            <Image
              priority={false}
              src={lesson.thumbnail}
              alt={`Thumbnail for ${lesson.title}`}
              width={300}
              height={200}
              className={`object-cover rounded-md ${
                isVertical ? "w-[100px] h-[75px]" : "w-full h-[150px] mb-4"
              }`}
            />
            <div>
              <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                {lesson.vietnamese}
              </p>
              <p className="text-sm text-muted-foreground">{lesson.duration}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
