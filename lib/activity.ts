import type { ActivityDay } from "@/types";

const HARDCODED_COUNTS = [
  1,0,2,3,1,0,2, 3,1,2,0,1,3,2, 1,0,1,2,3,1,0,
  2,3,1,0,2,1,3, 0,1,2,3,1,2,0, 1,3,2,1,0,2,3,
  1,2,0,3,1,2,1, 0,2,3,1,0,2,4, 3,1,2,4,1,0,2,
  3,4,1,2,0,3,1, 2,1,3,0,2,1,4, 3,2,1,0,2,3,1,
  4,2,1,3,0,2,1, 3,1,2,4,1,0,3, 2,1,4,3,2,1,0,
  2,3,1,4,2,0,1, 3,2,1,0,3,2,4, 1,2,3,0,1,2,3,
  4,1,0,2,3,1,2, 0,3,1,2,4,1,2,
];

// Hardcoded date strings — no Date() math, no timezone issues
const BASE_DATES: string[] = [];
for (let i = 139; i >= 0; i--) {
  const ms = Date.UTC(2026, 4, 30) - i * 86400000;
  const d = new Date(ms);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  BASE_DATES.push(`${yyyy}-${mm}-${dd}`);
}

export function generateActivityData(weeks: number = 20): ActivityDay[] {
  const total = weeks * 7;
  return BASE_DATES.slice(-total).map((date, i) => ({
    date,
    count: HARDCODED_COUNTS[i] ?? 0,
  }));
}