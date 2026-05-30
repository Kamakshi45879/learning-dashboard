# ArcLearn — Student Dashboard

A futuristic Next.js 14 learning dashboard built for the Frontend Intern Challenge.

## Live Demo
> Deploy to Vercel (see below) and add your URL here.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

---

## Getting Started

### 1. Clone and Install
```bash
git clone https://github.com/YOUR_USERNAME/learning-dashboard
cd learning-dashboard
npm install
```

### 2. Set up Supabase
1. Create a free project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** in your Supabase dashboard
3. Run the contents of `supabase-setup.sql` to create the `courses` table and seed data
4. Copy your credentials from **Project Settings → API**

### 3. Configure Environment Variables
```bash
cp .env.example .env.local
```
Fill in your Supabase URL and anon key in `.env.local`.

> **Note**: The app gracefully falls back to mock data if Supabase is not configured, so you can explore the UI before connecting a database.

### 4. Run Locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

---

## Architecture Decisions

### Server / Client Component Split

| Component | Type | Reason |
|-----------|------|--------|
| `app/dashboard/page.tsx` | **Server** | Fetches courses directly from Supabase; no client bundle |
| `CourseGrid` (inline) | **Server** | Async data fetch wrapped in `<Suspense>` |
| `Sidebar` | **Client** | Needs `useState` for collapse/active state |
| `HeroTile` | **Client** | Uses Framer Motion's `motion.div` |
| `CourseCard` | **Client** | Framer Motion hover animations |
| `ActivityTile` | **Client** | Framer Motion staggered cell reveals |
| `AnimatedProgress` | **Client** | Framer Motion width animation |

**Key principle**: Data fetching stays on the server; interactivity is isolated in leaf client components. This minimizes the JS bundle shipped to the browser.

### Animation Strategy (Zero Layout Shifts)
All Framer Motion animations use only `transform` (translate, scale) and `opacity` — never `width`, `height`, `margin`, or `padding` transitions. This guarantees zero layout shifts (CLS = 0) per the Chrome Paint/Layout pipeline.

The only exception is `AnimatedProgress`, which animates `width` on initial mount (not on hover), and is isolated inside `overflow-hidden` so it cannot affect surrounding layout.

### Loading States
`app/dashboard/loading.tsx` provides instant skeleton feedback while the route's async data resolves. `<Suspense>` wraps the `CourseGrid` specifically so the rest of the page (Hero, Stats, Activity) renders immediately from the server without waiting for the Supabase fetch.

### Responsive Layout
- **Desktop (>1024px)**: Full sidebar + 3-column Bento grid
- **Tablet (768–1024px)**: Icon-only sidebar + 3-column grid collapses to 2-column via CSS
- **Mobile (<768px)**: Fixed bottom nav, single-column stacking

---

## Challenges & Trade-offs

1. **Dynamic Icon Rendering**: The `icon_name` field is a string, but Lucide exports named components. The solution is a static `iconMap` record — if you add new icons, add them to `components/ui/dynamic-icon.tsx`.

2. **Framer Motion + Server Components**: Framer Motion's `motion.*` components are client-only. The pattern used is thin `"use client"` wrapper components (`HoverCard`, `StaggerTile`, etc.) that accept `children`, keeping the data-fetching parent as a Server Component.

3. **Font Loading**: `next/font/google` is used with `variable` mode so Tailwind can reference the CSS custom properties, giving us zero-FOUT font loading.

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```
