import { CourseCardSkeleton, HeroSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <section className="p-6 md:p-8 space-y-6">
      {/* Page header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hero */}
        <div className="col-span-full md:col-span-2">
          <HeroSkeleton />
        </div>
        {/* Stats */}
        <div>
          <Skeleton className="h-[180px] rounded-2xl" />
        </div>

        {/* Activity */}
        <div className="col-span-full md:col-span-2">
          <Skeleton className="h-[180px] rounded-2xl" />
        </div>
        <div>
          <Skeleton className="h-[180px] rounded-2xl" />
        </div>

        {/* Course cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
