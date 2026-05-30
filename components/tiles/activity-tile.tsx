"use client";

import { motion } from "framer-motion";
import { generateActivityData } from "@/lib/activity";
import { Activity } from "lucide-react";

const INTENSITY_COLORS = [
  "bg-white/[0.04]",         // 0 - empty
  "bg-arc-400/20",            // 1 - light
  "bg-arc-400/40",            // 2 - medium
  "bg-arc-400/65",            // 3 - strong
  "bg-arc-300 shadow-[0_0_4px_rgba(0,212,212,0.5)]", // 4 - max
];

// Generated once at module level — purely deterministic (no Date(), no Math.random())
// so server and client produce identical output
const ACTIVITY_DATA = generateActivityData(20);

export function ActivityTile() {
  const data = ACTIVITY_DATA;
  const totalDays = data.filter((d) => d.count > 0).length;
  const maxStreak = 14; // mock

  // Group into weeks
  const weeks: typeof data[] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <article className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-space-850 p-5 col-span-full md:col-span-2">
      {/* Subtle glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-arc-400/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-arc-400" />
            <h2 className="text-sm font-medium text-white/80">Learning Activity</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-white/30 font-mono">Active days</p>
              <p className="text-sm font-mono font-semibold text-arc-300">{totalDays}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/30 font-mono">Best streak</p>
              <p className="text-sm font-mono font-semibold text-arc-300">{maxStreak}</p>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <motion.div
                    key={day.date}
                    className={`w-3 h-3 rounded-[2px] ${INTENSITY_COLORS[day.count]} cursor-pointer`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (wi * 7 + di) * 0.008,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                    title={`${day.date}: ${day.count} sessions`}
                    whileHover={{ scale: 1.4 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 justify-end">
          <span className="text-[10px] text-white/25 font-mono">Less</span>
          {INTENSITY_COLORS.map((cls, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${cls}`} />
          ))}
          <span className="text-[10px] text-white/25 font-mono">More</span>
        </div>
      </div>
    </article>
  );
}
