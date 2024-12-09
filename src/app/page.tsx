import CourseCard from "@/components/CourseCard";
import { pronunciationCourse } from "@/data/pronunciation/pronunciation-course";

export default function HomePage() {
  return (
    <main className="w-full max-w-[768px] border border-neutral-400 mx-auto p-6">
      <CourseCard
        title={pronunciationCourse.title}
        lessons={pronunciationCourse.lessons}
      />
    </main>
  );
}
