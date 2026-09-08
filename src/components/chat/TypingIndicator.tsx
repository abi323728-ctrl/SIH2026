"use client";

import React from "react";
import { motion } from "framer-motion";

interface TypingIndicatorProps {
  statusText?: string;
}

export default function TypingIndicator({ statusText = "Searching Indian Standards Database..." }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-bis-900/90 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-200 shadow-sm w-fit max-w-md transition-colors duration-200"
    >
      {/* Rotating BIS-Style Shield Node */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/40 flex-shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <path
            d="M12 2L4 5V11C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11V5L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
        </svg>
      </div>

      {/* Dynamic Status Text & Pulsing Dots */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-800 dark:text-cyan-100">
          <span>{statusText}</span>
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dot-1" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dot-2" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dot-3" />
          </div>
        </div>
        <span className="text-[10px] text-slate-500 dark:text-slate-400">
          Querying BIS QCO registry & NABL testing catalog
        </span>
      </div>
    </motion.div>
  );
}
