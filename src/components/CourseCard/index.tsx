"use client";

import { useState } from "react";
import CourseCardHeader from "./CourseCardHeader";
import LessonGrid from "./LessonGrid";
import { LyricsUnitMetaWithId } from "@/types/lyric";

type CourseCardProps = {
  title: string;
  lessons: LyricsUnitMetaWithId[];
};

export default function CourseCard({ title, lessons }: CourseCardProps) {
  const [isVertical, setIsVertical] = useState(false);

  const handleLayoutToggle = () => {
    setIsVertical((prev) => !prev);
  };

  return (
    <>
      <CourseCardHeader
        title={title}
        isVertical={isVertical}
        onLayoutToggle={handleLayoutToggle}
      />
      <LessonGrid lessons={lessons} isVertical={isVertical} />
    </>
  );
}
