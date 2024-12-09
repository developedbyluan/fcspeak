import CourseCard from "@/components/CourseCard";
import { lessons } from "@/data/lessons";

export default function HomePage() {
  return (
    <main className="w-full max-w-[768px] border border-neutral-400 mx-auto p-6">
      <CourseCard title="Pronunciation Course" lessons={lessons} />
    </main>
  );
}
