"use client";

import { useParams } from "next/navigation";
import PronunciationCourseUnit from "@/components/PronunciationCourseUnit";

export default function PronunciationPage() {
  const { unitId } = useParams();
  return (
    <div>
      {unitId === "unit1" && <PronunciationCourseUnit />}
    </div>
  );
}
