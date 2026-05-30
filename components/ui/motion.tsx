"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useState, useEffect } from "react";

// Stagger container
export const StaggerContainer = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: delay,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

// Stagger child tile
export const StaggerTile = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 22,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

// Hover card with spring physics
export const HoverCard = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLMotionProps<"article">) => (
  <motion.article
    className={className}
    whileHover={{
      scale: 1.018,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }}
    whileTap={{ scale: 0.99 }}
    {...props}
  >
    {children}
  </motion.article>
);

// Animated progress bar — useEffect guard prevents server/client mismatch
export const AnimatedProgress = ({
  value,
  color = "arc",
}: {
  value: number;
  color?: "arc" | "void" | "nova";
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorMap = {
    arc: {
      track: "bg-arc-300/10",
      bar: "bg-gradient-to-r from-arc-400 to-arc-300",
      glow: "shadow-[0_0_8px_rgba(0,212,212,0.6)]",
    },
    void: {
      track: "bg-void-300/10",
      bar: "bg-gradient-to-r from-void-400 to-void-300",
      glow: "shadow-[0_0_8px_rgba(167,139,250,0.6)]",
    },
    nova: {
      track: "bg-nova-400/10",
      bar: "bg-gradient-to-r from-nova-500 to-nova-400",
      glow: "shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    },
  };

  const c = colorMap[color];

  return (
    <div className={`relative h-1.5 rounded-full ${c.track} overflow-hidden`}>
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full ${c.bar} ${c.glow}`}
        initial={{ width: "0%" }}
        animate={{ width: mounted ? `${value}%` : "0%" }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
      />
    </div>
  );
};

// Sidebar nav item with layoutId highlight
export const NavHighlight = ({
  isActive,
  layoutId,
}: {
  isActive: boolean;
  layoutId: string;
}) =>
  isActive ? (
    <motion.div
      layoutId={layoutId}
      className="absolute inset-0 rounded-lg bg-arc-400/10 border border-arc-400/20"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  ) : null;
