"use client";

import { useParams } from "next/navigation";
import PronunciationCourseUnit from "@/components/PronunciationCourseUnit";

export const runtime = "edge";

export default function PronunciationPage() {
  const { unitId } = useParams();
  // TODO: 
  //  1. Supabase table: pronunciation 
  //  2. SupabaseId: unitId
  return (
    <div>
      {unitId === "unit1" && <PronunciationCourseUnit />}
    </div>
  );
}
