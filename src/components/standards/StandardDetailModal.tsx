"use client";

import React from "react";
import { Standard } from "@/types";
import { useApp } from "@/lib/context/AppContext";
import { useChat } from "@/lib/context/ChatContext";
import { useRouter } from "next/navigation";
import {
  X,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  FileText,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  Coins,
  MessageSquare
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface StandardDetailModalProps {
  standard: Standard | null;
  onClose: () => void;
}

export default function StandardDetailModal({ standard, onClose }: StandardDetailModalProps) {
  const { toggleSaveStandard, isStandardSaved } = useApp();
  const { sendMessage } = useChat();
  const router = useRouter();

  if (!standard) return null;

  const isSaved = isStandardSaved(standard.id);

  const handleAskAIAboutThis = () => {
    onClose();
    sendMessage(`Explain the mandatory compliance requirements, testing, and application process for ${standard.isNumber} (${standard.title})`);
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-bis-900 border border-slate-200 dark:border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-200"
      >
        {/* Top Header */}
        <div className="relative p-6 pb-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-bis-950/80">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 font-mono font-bold text-sm">
                  {standard.isNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 text-xs font-semibold">
                  {standard.scheme}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                    standard.qcoStatus.includes("Mandatory")
                      ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/40"
                      : "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40"
                  }`}
                >
                  {standard.qcoStatus}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {standard.title}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => toggleSaveStandard(standard.id)}
                className={`p-2 rounded-xl transition-colors ${
                  isSaved
                    ? "text-saffron-500 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-500/15"
                    : "text-slate-400 hover:text-saffron-500 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
                title={isSaved ? "Saved" : "Save Bookmark"}
              >
                {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Industry / Sector</span>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">{standard.industry}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Standard Year</span>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">{standard.year} Edition</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Lab Turnaround</span>
              <div className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">{standard.labTestTurnaround || "15 Days"}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Estimated Fee</span>
              <div className="text-xs font-semibold text-saffron-600 dark:text-saffron-300">{standard.feeEstimateRange || "₹50,000"}</div>
            </div>
          </div>

          {/* Scope and Applicability */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-bis-950/50 border border-slate-200 dark:border-white/5 space-y-3">
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Scope of Indian Standard
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{standard.scope}</p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-white/5">
              <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Legal Applicability & Mandate
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{standard.applicability}</p>
            </div>
          </div>

          {/* Testing Requirements Grid */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              Mandatory Testing & Quality Clauses
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {standard.testingRequirements.map((req, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marking & Packaging Guidelines */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600 dark:text-saffron-400" />
              ISI Marking & Labeling Rules
            </h4>
            <div className="p-4 rounded-2xl bg-saffron-50 dark:bg-saffron-950/20 border border-saffron-200 dark:border-saffron-500/30 space-y-2 text-xs text-saffron-900 dark:text-saffron-200">
              {standard.markingRequirements.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 flex-shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Application Documents */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Mandatory Factory Audit Documentation
            </h4>
            <div className="space-y-1.5">
              {standard.requiredDocuments.map((doc, i) => (
                <div
                  key={i}
                  className="p-2.5 px-3 rounded-xl bg-slate-50 dark:bg-bis-950/50 border border-slate-200 dark:border-white/5 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-bis-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={handleAskAIAboutThis}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask BIS AI About This Standard</span>
          </button>

          <a
            href={standard.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>Open Official BIS Gazette</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
