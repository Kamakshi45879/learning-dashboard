import { Suspense } from "react";
import { getCourses, MOCK_COURSES } from "@/lib/supabase";
import { HeroTile } from "@/components/tiles/hero-tile";
import { CourseCard } from "@/components/tiles/course-card";
import { ActivityTile } from "@/components/tiles/activity-tile";
import { StatsTile } from "@/components/tiles/stats-tile";
import { CourseError } from "@/components/tiles/course-error";
import { CourseCardSkeleton } from "@/components/ui/skeleton";
import { StaggerContainer, StaggerTile } from "@/components/ui/motion";
import { Bell, Search } from "lucide-react";
import type { Course } from "@/types";

// Server Component: fetches courses
async function CourseGrid() {
  let courses: Course[] = [];
  let errorMessage: string | null = null;

  try {
    courses = await getCourses();
    // Fallback to mock data if Supabase isn't configured or returns empty
    if (!courses || courses.length === 0) {
      courses = MOCK_COURSES;
    }
  } catch (err) {
    // If env vars missing, use mock data silently in demo mode
    const msg = err instanceof Error ? err.message : "Unknown error";
    if (msg.includes("Missing Supabase")) {
      courses = MOCK_COURSES;
    } else {
      errorMessage = msg;
    }
  }

  if (errorMessage) {
    return <CourseError message={errorMessage} />;
  }

  return (
    <>
      {courses.map((course, i) => (
        <StaggerTile key={course.id}>
          <CourseCard course={course} index={i} />
        </StaggerTile>
      ))}
    </>
  );
}

// Student data (in a real app this would also come from Supabase auth/profile)
const STUDENT = {
  name: "Alex",
  streak: 14,
  level: 12,
  totalXP: 8_420,
  avatarInitials: "AK",
};

export default function DashboardPage() {
  return (
    <section className="p-5 md:p-8 max-w-[1400px] mx-auto">
      {/* Top bar */}
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em]">
            Student Dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-lg bg-space-800 border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
          <button className="relative w-8 h-8 rounded-lg bg-space-800 border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-arc-400 animate-pulse-slow" />
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4" delay={0.1}>
        {/* Hero tile — spans 2 cols on md+ */}
        <StaggerTile className="col-span-full md:col-span-2">
          <HeroTile
            name={STUDENT.name}
            streak={STUDENT.streak}
            level={STUDENT.level}
            totalXP={STUDENT.totalXP}
          />
        </StaggerTile>

        {/* Stats tile */}
        <StaggerTile>
          <StatsTile />
        </StaggerTile>

        {/* Activity tile — spans 2 cols */}
        <StaggerTile className="col-span-full md:col-span-2">
          <ActivityTile />
        </StaggerTile>

        {/* Next milestone tile */}
        <StaggerTile>
          <article className="rounded-2xl border border-white/[0.06] bg-space-850 p-5 h-full flex flex-col justify-between min-h-[160px]">
            <div>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-3">
                Next Milestone
              </p>
              <p className="text-sm font-medium text-white/80">
                Reach Level 13
              </p>
              <p className="text-xs text-white/30 mt-1">580 XP remaining</p>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-void-300/60">8,420 XP</span>
                <span className="text-void-300/60">9,000 XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-void-300/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-void-400 to-void-300 shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                  style={{ width: "93.5%" }}
                />
              </div>
            </div>
          </article>
        </StaggerTile>

        {/* Section label */}
        <div className="col-span-full flex items-center gap-3 pt-2">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-[0.2em]">
            Active Courses
          </h2>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>

        {/* Course cards — from Supabase (Server Component) */}
        <Suspense
          fallback={
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </>
          }
        >
          <CourseGrid />
        </Suspense>
      </StaggerContainer>
    </section>
  );
}
