"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import PronunciationCourseUnit from "@/components/PronunciationCourseUnit";
import { useEffect, useState } from "react";
import { fakeSupabaseData } from "@/data/fake-supabase";
import type { FakeSupabaseData } from "@/types/database";

export const runtime = "edge";

export default function PronunciationPage() {
  const { unitId } = useParams();
  // TODO:
  //  1. Supabase table: pronunciation
  //  2. SupabaseId: unitId
  const [availableUnitId, setAvailableUnitId] = useState<string | null>(null);

  useEffect(() => {
  if(fakeSupabaseData.pronunciation[unitId as keyof FakeSupabaseData["pronunciation"]]){
      setAvailableUnitId(unitId as string);
    } else {
      throw new Error("Unit not found");
    }
  }, [unitId]);
  return (
    <div>
      {availableUnitId ? (
        <PronunciationCourseUnit unitId={availableUnitId} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-center text-3xl font-bold">
           Welcome 
          </h1>
          <Link href="/" className="text-blue-500">
            Go back to All Courses
          </Link>
        </div>
      )}
    </div>
  );
}
