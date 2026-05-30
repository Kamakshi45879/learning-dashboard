"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star, ArrowRight } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
  level: number;
  totalXP: number;
}

export function HeroTile({ name, streak, level, totalXP }: HeroTileProps) {
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
    );
  }, []);

  return (
    <article className="relative col-span-full md:col-span-2 rounded-2xl overflow-hidden border border-white/[0.06] bg-space-850 p-6 md:p-8 min-h-[180px] flex flex-col justify-between">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-100"
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-arc-400/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-void-400/8 blur-3xl"
        aria-hidden="true"
      />

      {/* Corner accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arc-400/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* greeting is client-only via useEffect — no hydration mismatch */}
        <p className="text-xs font-mono text-arc-400/70 tracking-[0.2em] uppercase mb-2">
          {greeting}
        </p>
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-white leading-tight">
          Welcome back,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-arc-300 to-arc-400">
            {name}
          </span>
        </h1>
        <p className="text-sm text-white/40 mt-1.5">
          Keep up the momentum — you&apos;re on a roll.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-4 mt-6 flex-wrap">
        {/* Streak */}
        <div className="flex items-center gap-2 bg-nova-400/10 border border-nova-400/20 rounded-full px-3 py-1.5">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Flame className="w-3.5 h-3.5 text-nova-400" />
          </motion.div>
          <span className="text-xs font-mono font-semibold text-nova-400">
            {streak} day streak
          </span>
        </div>

        {/* Level */}
        <div className="flex items-center gap-2 bg-void-400/10 border border-void-300/20 rounded-full px-3 py-1.5">
          <Star className="w-3.5 h-3.5 text-void-300" />
          <span className="text-xs font-mono font-semibold text-void-300">
            Level {level}
          </span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2 bg-arc-400/10 border border-arc-400/20 rounded-full px-3 py-1.5">
          <span className="text-xs font-mono font-semibold text-arc-300">
            {totalXP.toFixed(0)} XP
          </span>
        </div>

        <button className="ml-auto flex items-center gap-1.5 text-xs text-white/30 hover:text-arc-300 transition-colors group">
          View progress
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
}
