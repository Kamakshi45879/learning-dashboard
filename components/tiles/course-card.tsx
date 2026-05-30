"use client";

import { HoverCard } from "@/components/ui/motion";
import { AnimatedProgress } from "@/components/ui/motion";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Course } from "@/types";
import { ArrowUpRight } from "lucide-react";

const COURSE_COLORS: Array<"arc" | "void" | "nova"> = ["arc", "void", "nova", "arc"];

const COLOR_STYLES = {
  arc: {
    icon: "bg-arc-400/15 border-arc-400/25 text-arc-300",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,212,0.08)]",
    top: "from-arc-400/5 to-transparent",
  },
  void: {
    icon: "bg-void-300/15 border-void-300/25 text-void-300",
    glow: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.08)]",
    top: "from-void-300/5 to-transparent",
  },
  nova: {
    icon: "bg-nova-400/15 border-nova-400/25 text-nova-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]",
    top: "from-nova-400/5 to-transparent",
  },
};

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const colorKey = COURSE_COLORS[index % COURSE_COLORS.length];
  const styles = COLOR_STYLES[colorKey];

  return (
    <HoverCard
      className={`
        group relative rounded-2xl overflow-hidden cursor-pointer
        border border-white/[0.06] bg-space-850
        hover:border-white/[0.12] transition-[border-color,box-shadow] duration-300
        ${styles.glow} p-5
      `}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
        aria-hidden="true"
      />

      {/* Top gradient sheen */}
      <div
        className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${styles.top} pointer-events-none`}
        aria-hidden="true"
      />

      {/* Top accent line (appears on hover) */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${styles.icon}`}
          >
            <DynamicIcon name={course.icon_name} className="w-4 h-4" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors mt-0.5 flex-shrink-0" />
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white/90 leading-snug line-clamp-2">
            {course.title}
          </h3>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
              Progress
            </span>
            <span className="text-[10px] font-mono font-semibold text-white/60">
              {course.progress}%
            </span>
          </div>
          <AnimatedProgress value={course.progress} color={colorKey} />
        </div>
      </div>
    </HoverCard>
  );
}
