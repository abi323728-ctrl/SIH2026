"use client";

import React from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useChat } from "@/lib/context/ChatContext";
import { useApp } from "@/lib/context/AppContext";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/common/ThemeToggle";
import {
  MessageSquare,
  Search,
  FileUp,
  Layers,
  BookmarkCheck,
  ShieldCheck,
  Activity,
  FileCheck2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  onOpenComplianceMatrix?: () => void;
}

export default function DashboardHeader({ onOpenComplianceMatrix }: DashboardHeaderProps) {
  const { user } = useAuth();
  const { conversations, createNewChat } = useChat();
  const { savedStandards, analyzedDocuments, setIsDocAnalyzerOpen } = useApp();
  const router = useRouter();

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const totalMessagesCount = conversations.reduce((acc, c) => acc + c.messages.length, 0);

  const stats = [
    {
      label: "AI Queries Executed",
      value: totalMessagesCount,
      icon: MessageSquare,
      color: "from-blue-500/10 to-cyan-500/5 dark:from-blue-500/20 dark:to-cyan-500/10",
      borderColor: "border-cyan-200 dark:border-cyan-500/30",
      iconColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
      label: "Active Indian Standards",
      value: "22,500+",
      icon: ShieldCheck,
      color: "from-saffron-500/10 to-amber-500/5 dark:from-saffron-500/20 dark:to-amber-500/10",
      borderColor: "border-saffron-200 dark:border-saffron-500/30",
      iconColor: "text-saffron-600 dark:text-saffron-400"
    },
    {
      label: "Documents Analyzed",
      value: analyzedDocuments.length + 3,
      icon: FileCheck2,
      color: "from-purple-500/10 to-indigo-500/5 dark:from-purple-500/20 dark:to-indigo-500/10",
      borderColor: "border-purple-200 dark:border-purple-500/30",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      label: "Saved Standard Bookmarks",
      value: savedStandards.length,
      icon: BookmarkCheck,
      color: "from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/20 dark:to-teal-500/10",
      borderColor: "border-emerald-200 dark:border-emerald-500/30",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <div className="p-6 pb-2 transition-colors duration-200">
      {/* Top Banner / Welcome Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-saffron-600 dark:from-cyan-400 dark:to-blue-400">{user?.name || "Officer"}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              BIS Knowledge Connected
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore Indian Standards, verify mandatory QCOs, and analyze product compliance with AI.
          </p>
        </div>

        {/* Quick Action Buttons & Theme Switcher */}
        <div className="flex items-center flex-wrap gap-2">
          <ThemeToggle />

          <button
            onClick={() => createNewChat()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-saffron-300" />
            <span>Ask BIS AI</span>
          </button>

          <button
            onClick={() => router.push("/standards")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-bis-800 hover:bg-slate-200 dark:hover:bg-bis-700 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Search Standards</span>
          </button>

          <button
            onClick={() => setIsDocAnalyzerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-bis-800 hover:bg-slate-200 dark:hover:bg-bis-700 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
          >
            <FileUp className="w-3.5 h-3.5 text-saffron-500" />
            <span>Analyze Spec</span>
          </button>

          <button
            onClick={() => router.push("/bis-services")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-bis-800 hover:bg-slate-200 dark:hover:bg-bis-700 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>BIS Services</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-2">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-white/80 dark:bg-bis-900/60 border ${stat.borderColor} backdrop-blur-md relative overflow-hidden shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1.5 tracking-tight font-mono">
                {stat.value}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
