"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  BarChart2,
  Settings,
  ChevronLeft,
  Zap,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavHighlight } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { id: "analytics", label: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
];

const BOTTOM_ITEMS = [
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        className={cn(
          "hidden lg:flex flex-col h-full",
          "bg-space-900 border-r border-white/[0.06]",
          "transition-all duration-300 ease-in-out relative",
          collapsed ? "w-[72px]" : "w-[220px]"
        )}
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-arc-400/20 border border-arc-400/30 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-arc-300" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display text-sm font-semibold text-white tracking-wide whitespace-nowrap overflow-hidden"
              >
                ARCLEARN
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <div className="flex-1 px-2 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} href={item.href} onClick={() => setActive(item.id)}>
              <div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer",
                  "transition-colors duration-150",
                  active === item.id ? "text-arc-300" : "text-white/40 hover:text-white/70"
                )}
              >
                <NavHighlight isActive={active === item.id} layoutId="nav-highlight" />
                <item.icon className="w-[18px] h-[18px] flex-shrink-0 relative z-10" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-medium relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="px-2 py-4 border-t border-white/[0.06] space-y-1">
          {BOTTOM_ITEMS.map((item) => (
            <Link key={item.id} href={item.href} onClick={() => setActive(item.id)}>
              <div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer",
                  "transition-colors duration-150",
                  active === item.id ? "text-arc-300" : "text-white/40 hover:text-white/70"
                )}
              >
                <NavHighlight isActive={active === item.id} layoutId="nav-highlight" />
                <item.icon className="w-[18px] h-[18px] flex-shrink-0 relative z-10" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-medium relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          ))}

          {/* Avatar */}
          <div className={cn("flex items-center gap-3 px-3 py-2 mt-2")}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-arc-400 to-void-300 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-white">AK</span>
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs font-medium text-white/80 whitespace-nowrap">Alex Kim</p>
                  <p className="text-[10px] text-white/30 whitespace-nowrap">Level 12</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-space-700 border border-white/10 flex items-center justify-center hover:bg-space-600 transition-colors"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft className="w-3 h-3 text-white/50" />
          </motion.div>
        </button>
      </motion.nav>

      {/* Tablet Sidebar (icon-only) */}
      <nav className="hidden md:flex lg:hidden flex-col h-full w-[72px] bg-space-900 border-r border-white/[0.06]">
        <div className="flex items-center justify-center px-4 py-6 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-arc-400/20 border border-arc-400/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-arc-300" />
          </div>
        </div>
        <div className="flex-1 px-2 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} href={item.href} onClick={() => setActive(item.id)}>
              <div
                className={cn(
                  "relative flex items-center justify-center p-2.5 rounded-lg cursor-pointer",
                  active === item.id ? "text-arc-300 bg-arc-400/10" : "text-white/40 hover:text-white/70"
                )}
              >
                <item.icon className="w-[18px] h-[18px]" />
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-space-900/95 backdrop-blur-xl border-t border-white/[0.06] flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => (
          <Link key={item.id} href={item.href} onClick={() => setActive(item.id)}>
            <div
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg",
                active === item.id ? "text-arc-300" : "text-white/30"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
        <Link href="/dashboard/settings">
          <div className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-white/30">
            <Settings className="w-5 h-5" />
            <span className="text-[9px] font-medium">Settings</span>
          </div>
        </Link>
      </nav>
    </>
  );
}
