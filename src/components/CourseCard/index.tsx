"use client";

import { useState } from "react";
import CourseCardHeader from "./CourseCardHeader";

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
    </>
  );
}
