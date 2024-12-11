import { Skeleton } from "@/components/ui/skeleton";

export function AudioFileInputSkeleton() {
  return (
    <div className="w-3/4 max-w-md mx-auto mt-10">
      <div className="space-y-4 border-2 border-neutral-200 rounded-md shadow-md py-7 px-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
        {/* Course name skeleton */}
        <Skeleton className="h-2 w-20" />
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-2 w-5/6" />
          <Skeleton className="h-2 w-4/6" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-8 w-5/6 mt-10 mx-auto" />
      </div>
    </div>
  );
}