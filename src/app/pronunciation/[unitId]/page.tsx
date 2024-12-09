"use client";

import PronunciationCourseUnit from "@/components/PronunciationCourseUnit";
import { useParams } from "next/navigation";

export default function PronunciationPage() {
  const { unitId } = useParams();
  return (
    <>
      {unitId === "unit1" && (
        <div>
          <PronunciationCourseUnit />
        </div>
      )}
    </>
  );
}
