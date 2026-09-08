"use client";

import React from "react";
import { useChat } from "@/lib/context/ChatContext";
import {
  Lightbulb,
  ShieldCheck,
  Scale,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SuggestionCards() {
  const { sendMessage } = useChat();

  const suggestions = [
    {
      category: "Product Standards",
      query: "What BIS standard applies to LED bulbs?",
      description: "Extracts IS 16102, safety testing, and mandatory QCO requirements.",
      icon: Lightbulb,
      badge: "Popular Query",
      color: "from-blue-500/10 via-cyan-500/5 to-transparent",
      borderColor: "hover:border-cyan-400 dark:hover:border-cyan-500/40",
      iconColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
      category: "Certification Roadmap",
      query: "How do I obtain BIS certification?",
      description: "Step-by-step procedure for Scheme-I (ISI Mark) and e-BIS filing.",
      icon: ShieldCheck,
      badge: "Scheme-I / CRS",
      color: "from-purple-500/10 via-indigo-500/5 to-transparent",
      borderColor: "hover:border-purple-400 dark:hover:border-purple-500/40",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      category: "Mandatory Compliance",
      query: "Is BIS certification mandatory for pressure cookers in India?",
      description: "Verifies DPIIT Domestic Pressure Cooker Quality Control Order (IS 2347).",
      icon: Scale,
      badge: "QCO Active",
      color: "from-rose-500/10 via-amber-500/5 to-transparent",
      borderColor: "hover:border-rose-400 dark:hover:border-rose-500/40",
      iconColor: "text-rose-600 dark:text-rose-400"
    },
    {
      category: "Construction Standards",
      query: "Find the standard for cement and TMT steel rebars",
      description: "Details for IS 269 (OPC Cement) and IS 1786 (Fe 500D TMT bars).",
      icon: Search,
      badge: "Civil / Infra",
      color: "from-amber-500/10 via-saffron-500/5 to-transparent",
      borderColor: "hover:border-saffron-400 dark:hover:border-saffron-500/40",
      iconColor: "text-saffron-600 dark:text-saffron-400"
    },
    {
      category: "Consumer Protection",
      query: "How can I verify an ISI mark and gold HUID code?",
      description: "Citizen verification methods, BIS CARE app, and penalty rules.",
      icon: CheckCircle2,
      badge: "Public Guide",
      color: "from-emerald-500/10 via-teal-500/5 to-transparent",
      borderColor: "hover:border-emerald-400 dark:hover:border-emerald-500/40",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      category: "Industry Documentation",
      query: "What documents are required for BIS certification?",
      description: "Complete checklist of factory layouts, test benches, SIT & NOCs.",
      icon: FileSpreadsheet,
      badge: "Checklist",
      color: "from-sky-500/10 via-blue-500/5 to-transparent",
      borderColor: "hover:border-sky-400 dark:hover:border-sky-500/40",
      iconColor: "text-sky-600 dark:text-sky-400"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-4xl mx-auto text-center my-auto transition-colors duration-200">
      {/* Visual Thematic Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-4 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
        <span>Grounded in Official Bureau of Indian Standards Intelligence</span>
      </motion.div>

      {/* Main Headings */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2"
      >
        What do you need to know about <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-saffron-600 dark:from-cyan-400 dark:via-blue-400 dark:to-saffron-400">BIS?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mb-8"
      >
        Ask about Indian Standards (IS numbers), mandatory Quality Control Orders (QCOs), testing protocols, or certification schemes.
      </motion.p>

      {/* 6 Suggestion Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full text-left">
        {suggestions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.query}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
              onClick={() => sendMessage(item.query)}
              className={`group p-4 rounded-2xl bg-gradient-to-b ${item.color} bg-white/90 dark:bg-bis-900/60 border border-slate-200 dark:border-white/10 ${item.borderColor} cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-sm`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className={`p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${item.iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                    {item.badge}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>

              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-200 transition-colors line-clamp-2">
                &ldquo;{item.query}&rdquo;
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {item.description}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
