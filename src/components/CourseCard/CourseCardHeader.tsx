// components/course/CourseHeader.tsx
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";

type CourseCardHeaderProps = {
  title: string;
  isVertical: boolean;
  onLayoutToggle: () => void;
};

export default function CourseCardHeader({
  title,
  isVertical,
  onLayoutToggle,
}: CourseCardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button
        variant="outline"
        size="icon"
        onClick={onLayoutToggle}
        aria-label={
          isVertical
            ? "Switch to horizontal layout"
            : "Switch to vertical layout"
        }
      >
        {isVertical ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
