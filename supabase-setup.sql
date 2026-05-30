-- ============================================================
-- ArcLearn: Supabase Schema + Seed
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  progress    INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name   TEXT NOT NULL DEFAULT 'BookOpen',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (recommended)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (for the anon key used in the app)
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);

-- 4. Seed with mock data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',      75, 'Layers'),
  ('System Design Fundamentals',   42, 'Network'),
  ('TypeScript Deep Dive',         88, 'Code2'),
  ('Machine Learning with Python', 21, 'BrainCircuit');
