import CourseCard from "@/components/CourseCard";
import { pronunciationCourse } from "@/data/pronunciation/pronunciation-course";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full max-w-[768px] border border-neutral-400 mx-auto p-6">
      <Link href="/pronunciation/unit1/stats">Stats</Link>
      <CourseCard
        title={pronunciationCourse.title}
        lessons={pronunciationCourse.lessons}
      />
    </main>
  );
}
