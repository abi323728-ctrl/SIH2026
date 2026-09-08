"use client";

import React from "react";
import { useTheme } from "@/lib/context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  compact = false,
  className = "",
  showLabel = false
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, theme, setTheme } = useTheme();

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        type="button"
        className="relative flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-all duration-200 shadow-sm"
        title={resolvedTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <Moon className="w-4 h-4 text-cyan-400" />
              {showLabel && <span className="text-xs font-semibold pr-1">Dark</span>}
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <Sun className="w-4 h-4 text-amber-500" />
              {showLabel && <span className="text-xs font-semibold pr-1">Light</span>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
