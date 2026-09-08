"use client";

import React from "react";
import { useChat } from "@/lib/context/ChatContext";
import { useApp } from "@/lib/context/AppContext";
import { BIS_STANDARDS_DATABASE } from "@/lib/data/bisStandards";
import {
  ShieldAlert,
  ShieldCheck,
  FileText,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  Database,
  Building2
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RightIntelligencePanel() {
  const { activeConversation } = useChat();
  const {
    toggleSaveStandard,
    isStandardSaved,
    setSelectedStandardForInspector,
    setIsDocAnalyzerOpen
  } = useApp();

  // Find detected standard from conversation
  const detectedStandardCode = activeConversation?.detectedStandard;
  const standard =
    BIS_STANDARDS_DATABASE.find(
      (s) =>
        s.isNumber === detectedStandardCode ||
        (detectedStandardCode && s.isNumber.toLowerCase().includes(detectedStandardCode.toLowerCase()))
    ) || BIS_STANDARDS_DATABASE[0];

  const isSaved = isStandardSaved(standard.id);

  return (
    <aside className="w-80 lg:w-88 h-screen bg-white/95 dark:bg-bis-900/90 border-l border-slate-200 dark:border-white/10 flex flex-col z-20 select-none flex-shrink-0 hidden xl:flex transition-colors duration-200">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between min-h-[68px]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              BIS Intelligence
            </h3>
            <span className="text-[10px] text-cyan-700 dark:text-cyan-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Standards Inspector
            </span>
          </div>
        </div>

        <button
          onClick={() => toggleSaveStandard(standard.id)}
          className={`p-2 rounded-xl transition-colors ${
            isSaved
              ? "text-saffron-500 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-500/15"
              : "text-slate-400 hover:text-saffron-500 hover:bg-slate-100 dark:hover:bg-white/5"
          }`}
          title={isSaved ? "Saved" : "Save Bookmark"}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Thematic Category Image Banner */}
        <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group shadow-sm">
          <Image
            src="/images/bis-products.jpg"
            alt="BIS Product Testing"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 dark:from-bis-950 via-slate-900/40 dark:via-bis-950/60 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-600/90 text-white backdrop-blur-md">
              {standard.industry}
            </span>
            <span className="text-[10px] font-mono text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-md">
              {standard.year} Edition
            </span>
          </div>
        </div>

        {/* Current Inspected Standard Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-cyan-500/20 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-500/20">
              {standard.isNumber}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                standard.qcoStatus.includes("Mandatory")
                  ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30"
                  : "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
              }`}
            >
              {standard.qcoStatus}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {standard.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
              {standard.scope}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="text-[11px]">Scheme:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{standard.scheme}</span>
          </div>
        </div>

        {/* Mandatory Quality Control Order (QCO) Details */}
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-gradient-to-br dark:from-saffron-950/20 dark:to-bis-950 border border-amber-200 dark:border-saffron-500/20 space-y-2 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-saffron-300">
            <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-saffron-400" />
            <span>Regulating Ministry / Order</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {standard.ministry || "Ministry of Consumer Affairs / DPIIT Quality Control Orders"}
          </p>
          <div className="text-[10px] text-amber-700 dark:text-saffron-400 font-mono pt-1">
            Turnaround: {standard.labTestTurnaround || "15 Working Days"}
          </div>
        </div>

        {/* Required Lab Testing Parameters */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-bis-950/60 border border-slate-200 dark:border-white/10 space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              Key Test Parameters
            </span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">
              {standard.testingRequirements.length} Tests
            </span>
          </div>

          <div className="space-y-1.5">
            {standard.testingRequirements.slice(0, 3).map((test, i) => (
              <div key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <ChevronRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{test}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Link */}
        <a
          href={standard.officialSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-white transition-all text-xs font-semibold group shadow-sm"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Open Official BIS Gazette</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Bottom Knowledge Status */}
      <div className="p-3.5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-bis-950/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>BIS Knowledge Registry</span>
        </div>
        <span className="font-mono text-cyan-700 dark:text-cyan-300 font-semibold">v2026.3 Live</span>
      </div>
    </aside>
  );
}
