"use client";

import { useState } from "react";
import ContinueCardHeader from "./ContinueCardHeader";
import LessonGrid from "./LessonGrid";
import { Lesson } from "@/types/lesson";

type ContinueCardProps = {
  title: string;
  lessons: Lesson[];
};

export default function ContinueCard({ title, lessons }: ContinueCardProps) {
  const [isVertical, setIsVertical] = useState(false);

  const handleLayoutToggle = () => {
    setIsVertical((prev) => !prev);
  };

  return (
    <div className="mb-20">
      <ContinueCardHeader
        title={title}
        isVertical={isVertical}
        onLayoutToggle={handleLayoutToggle}
      />
      <LessonGrid lessons={lessons} isVertical={isVertical} />
    </div>
  );
}
