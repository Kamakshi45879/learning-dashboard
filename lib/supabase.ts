import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Check your .env.local file."
    );
  }

  return createClient(url, key);
}

export async function getCourses(): Promise<Course[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return (data as Course[]) ?? [];
}

// Fallback mock data — hardcoded dates (no new Date()) to avoid hydration mismatch
export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Layers",
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "System Design Fundamentals",
    progress: 42,
    icon_name: "Network",
    created_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    title: "TypeScript Deep Dive",
    progress: 88,
    icon_name: "Code2",
    created_at: "2026-01-03T00:00:00.000Z",
  },
  {
    id: "4",
    title: "ML with Python",
    progress: 21,
    icon_name: "BrainCircuit",
    created_at: "2026-01-04T00:00:00.000Z",
  },
];
