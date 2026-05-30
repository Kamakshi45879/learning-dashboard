/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space palette
        space: {
          950: "#04040a",
          900: "#07070f",
          850: "#0a0a14",
          800: "#0d0d1a",
          700: "#141428",
          600: "#1a1a36",
        },
        // Electric cyan accent
        arc: {
          50: "#e0fffe",
          100: "#b3fffd",
          200: "#66fffe",
          300: "#00f5f5",
          400: "#00d4d4",
          500: "#00b3b3",
          600: "#008080",
        },
        // Indigo glow
        void: {
          300: "#a78bfa",
          400: "#7c3aed",
          500: "#6d28d9",
        },
        // Amber warning
        nova: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,212,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,212,0.03) 1px, transparent 1px)",
        "glow-arc":
          "radial-gradient(ellipse at center, rgba(0,212,212,0.15) 0%, transparent 70%)",
        "glow-void":
          "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "glow-breathe": "glow-breathe 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-breathe": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      boxShadow: {
        "arc-glow": "0 0 20px rgba(0,212,212,0.3), 0 0 60px rgba(0,212,212,0.1)",
        "void-glow": "0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,212,0.15)",
        "inset-glow": "inset 0 0 20px rgba(0,212,212,0.05)",
      },
    },
  },
  plugins: [],
};
