"use client";

import { useState } from "react";
import CourseCardHeader from "./CourseCardHeader";
import { lessons } from "@/data/lessons";
import LessonGrid from "./LessonGrid";

export default function CourseCard() {
  const [isVertical, setIsVertical] = useState(false);

  const handleLayoutToggle = () => {
    setIsVertical((prev) => !prev);
  };

  return (
    <>
      <CourseCardHeader
        title="Pronunciation Course"
        isVertical={isVertical}
        onLayoutToggle={handleLayoutToggle}
      />
      <LessonGrid lessons={lessons} isVertical={isVertical} />
    </>
  );
}
