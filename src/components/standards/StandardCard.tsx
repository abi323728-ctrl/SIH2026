"use client";

import React from "react";
import { Standard } from "@/types";
import { useApp } from "@/lib/context/AppContext";
import {
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface StandardCardProps {
  standard: Standard;
  onSelect: (std: Standard) => void;
}

export default function StandardCard({ standard, onSelect }: StandardCardProps) {
  const { toggleSaveStandard, isStandardSaved } = useApp();
  const isSaved = isStandardSaved(standard.id);

  // Map image
  let cardImage = "/images/bis-products.jpg";
  if (standard.industry.toLowerCase().includes("electric") || standard.industry.toLowerCase().includes("it")) {
    cardImage = "/images/bis-lab.jpg";
  } else if (standard.industry.toLowerCase().includes("precious") || standard.industry.toLowerCase().includes("gem")) {
    cardImage = "/images/bis-hero.jpg";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(standard)}
      className="group relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-bis-900/90 dark:to-bis-950/90 border border-slate-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-500/40 p-5 shadow-sm dark:shadow-glass cursor-pointer overflow-hidden flex flex-col justify-between transition-colors duration-200"
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
              {standard.isNumber}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                standard.qcoStatus.includes("Mandatory")
                  ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30"
                  : "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
              }`}
            >
              {standard.qcoStatus.includes("Mandatory") ? "● Mandatory" : "○ Voluntary"}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveStandard(standard.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isSaved
                ? "text-saffron-500 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-500/15"
                : "text-slate-400 hover:text-saffron-500 hover:bg-slate-100 dark:hover:bg-white/5"
            }`}
            title={isSaved ? "Saved" : "Save Bookmark"}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Title & Category */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-200 transition-colors leading-snug line-clamp-2">
          {standard.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
          <span className="text-cyan-700 dark:text-cyan-400 font-medium">{standard.productCategory}</span>
          <span>•</span>
          <span>{standard.year} Edition</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
          {standard.scope}
        </p>
      </div>

      {/* Bottom info */}
      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-mono">
          {standard.testingRequirements.length} Test Clauses
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 dark:text-cyan-400 group-hover:text-cyan-800 dark:group-hover:text-cyan-300">
          <span>View Standard</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </motion.div>
  );
}
