"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export default function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  return (
    <Link href="/dashboard" className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Animated Original Geometric Compliance Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 dark:bg-gradient-to-br dark:from-bis-800 dark:to-bis-900 border border-slate-700/50 dark:border-cyan-500/30 group-hover:border-cyan-400/60 shadow-md dark:shadow-glass transition-all duration-300">
        <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-sm group-hover:bg-cyan-500/20 transition-all" />
        
        {/* Geometric Shield / Node vector */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors z-10"
        >
          {/* Outer Shield Outline */}
          <path
            d="M12 2L4 5V11C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11V5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Verification Check & IS Geometry */}
          <path
            d="M9 12L11 14L15 9.5"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Standards Node Dots */}
          <circle cx="12" cy="6.5" r="1" fill="#38bdf8" />
        </svg>

        {/* Pulse Indicator */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron-500"></span>
        </span>
      </div>

      {!compact && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-100 transition-colors">
              BIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-saffron-600 dark:from-cyan-400 dark:via-blue-400 dark:to-saffron-400">IntelliAssist</span>
            </span>
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
              v2.6
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            Intelligence for Indian Standards
          </span>
        </div>
      )}
    </Link>
  );
}
