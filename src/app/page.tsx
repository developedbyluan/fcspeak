"use client";

import ContinueCard from "@/components/ContinueCard";
import CourseCard from "@/components/CourseCard";
import { pronunciationCourse } from "@/data/pronunciation/pronunciation-course";
import { Lesson } from "@/types/lesson";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [continueLessons, setContinueLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const continueData = localStorage.getItem(
      `continue-training-history`
    );
    if (!continueData) return;
    const continueDataObject = JSON.parse(continueData);
    const continueLessonsArray: Lesson[] = Object.values(continueDataObject).map(
      (lesson: any) => lesson.meta
    );
    setContinueLessons(continueLessonsArray);
  }, []);

  return (
    <main className="w-full max-w-[768px] border border-neutral-400 mx-auto p-6">
      {continueLessons.length > 0 && (
        <ContinueCard title="Continue Training" lessons={continueLessons} />
      )}
      <CourseCard
        title={pronunciationCourse.title}
        lessons={pronunciationCourse.lessons}
      />
    </main>
  );
}
