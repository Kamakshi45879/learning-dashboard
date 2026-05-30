# ArcLearn — Student Dashboard

A futuristic Next.js 14 learning dashboard built for the Frontend Intern Challenge.

## Live Demo

🔗 [https://learning-dashboard-drab-kappa.vercel.app/](https://learning-dashboard-drab-kappa.vercel.app/)

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
git clone https://github.com/Kamakshi45879/learning-dashboard
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

## Challenges & Solutions

### 1. Hydration Mismatch
The biggest challenge was preventing React hydration errors between server and client rendering.

**Problem**: `new Date().toISOString()` in mock data and time-based greetings (`Good morning/evening`) produced different values on server vs client, causing hydration mismatches.

**Solution**:
- Replaced all `new Date()` calls in mock data with hardcoded ISO strings
- Moved the time-based greeting into a `useEffect` hook with a safe default (`"Welcome back"`) on the server
- Added a `mounted` state guard to `AnimatedProgress` so the progress bar only animates after client hydration

### 2. Dynamic Icon Rendering
The `icon_name` field is a string from Supabase, but Lucide exports named components.

**Solution**: A static `iconMap` record in `components/ui/dynamic-icon.tsx` maps string names to Lucide components. If you add new icons to the database, add them to this map.

### 3. Framer Motion + Server Components
Framer Motion's `motion.*` components are client-only and cannot be used in Server Components.

**Solution**: Thin `"use client"` wrapper components (`HoverCard`, `StaggerTile`, `StaggerContainer`, `AnimatedProgress`, `NavHighlight`) accept `children` as props, keeping all data-fetching parents as pure Server Components. This pattern keeps the client bundle minimal.

### 4. Activity Graph Determinism
The contribution graph needed to look realistic but also be fully deterministic (same output on server and client).

**Solution**: Used hardcoded intensity counts and UTC-based date strings with a fixed reference date, so the graph renders identically on both server and client with no hydration issues.

---

## Project Structure

```
learning-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx          # Server Component — fetches courses
│   │   ├── layout.tsx        # Dashboard shell with sidebar
│   │   └── loading.tsx       # Full page skeleton
│   └── layout.tsx            # Root layout with fonts
├── components/
│   ├── layout/
│   │   └── sidebar.tsx       # Collapsible nav with layoutId animations
│   ├── tiles/
│   │   ├── hero-tile.tsx     # Greeting + streak indicator
│   │   ├── course-card.tsx   # Dynamic course tile with progress bar
│   │   ├── activity-tile.tsx # Contribution graph
│   │   └── stats-tile.tsx    # Weekly stats
│   └── ui/
│       ├── motion.tsx        # Reusable Framer Motion components
│       ├── skeleton.tsx      # Shimmer skeleton loaders
│       └── dynamic-icon.tsx  # String → Lucide icon renderer
├── lib/
│   ├── supabase.ts           # Supabase client + getCourses()
│   └── activity.ts           # Deterministic activity data generator
└── types/
    └── index.ts              # TypeScript interfaces
```

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