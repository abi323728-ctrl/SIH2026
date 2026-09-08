import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bis: {
          950: "#040711",
          900: "#080e1e",
          850: "#0c152b",
          800: "#111c38",
          750: "#17254a",
          700: "#1e2f5c",
          600: "#2a427f",
          500: "#3b82f6",
          400: "#60a5fa",
          300: "#93c5fd",
        },
        saffron: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        cyan: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-pattern": "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 60%)",
        "cyber-grid": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-blue": "0 0 35px -5px rgba(59, 130, 246, 0.25)",
        "glow-cyan": "0 0 35px -5px rgba(14, 165, 233, 0.3)",
        "glow-saffron": "0 0 30px -5px rgba(245, 158, 11, 0.25)",
        "glow-emerald": "0 0 30px -5px rgba(16, 185, 129, 0.25)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.9" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
