import { Card, CardContent } from "@/components/ui/card";
import { Lesson } from "@/types/lesson";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { Button } from "../ui/button";

type LessonCardProps = {
  lesson: Lesson;
  isVertical: boolean;
};

export default function LessonCard({ lesson, isVertical }: LessonCardProps) {
  const router = useRouter();

  const handleLessonCardClick = () => {
    router.push(`/pronunciation/unit${lesson.id}`);
  };

  const handleStatsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/pronunciation/unit${lesson.id}/stats`);
  };

  return (
    <div className="relative">
      <Card
        key={lesson.id}
        className={cn(
          "w-full cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[1] active:shadow-none",
          isVertical ? "w-full" : "w-[250px] shrink-0"
        )}
        onClick={handleLessonCardClick}
        role="button"
        aria-label={`Go to Unit ${lesson.id}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleLessonCardClick();
          }
        }}
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
      <Link
        className="absolute bottom-2 right-2"
        href={`/pronunciation/unit${lesson.id}/stats`}
        passHref
      >
        <Button variant="outline" size="sm" className="mt-2">
          <BarChart2 className="h-4 w-4 mr-2" />
          View Stats
        </Button>
      </Link>
    </div>
  );
}
