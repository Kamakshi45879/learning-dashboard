import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-space-700",
        "after:absolute after:inset-0 after:content-['']",
        "after:bg-gradient-to-r after:from-transparent after:via-white/[0.04] after:to-transparent",
        "after:animate-shimmer after:bg-[length:200%_100%]",
        className
      )}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-space-800 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-space-800 p-8 space-y-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}
