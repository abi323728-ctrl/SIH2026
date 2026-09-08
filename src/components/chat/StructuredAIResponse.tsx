"use client";

import React, { useState } from "react";
import { StructuredAIContent } from "@/types";
import { useApp } from "@/lib/context/AppContext";
import {
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Bookmark,
  BookmarkCheck,
  Copy,
  Volume2,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
  Check
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface StructuredAIResponseProps {
  content: StructuredAIContent;
}

export default function StructuredAIResponse({ content }: StructuredAIResponseProps) {
  const { toggleSaveStandard, isStandardSaved, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // If this is an off-topic refusal
  if (content.isOffTopic) {
    return (
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-bis-900/90 border border-amber-300 dark:border-amber-500/30 text-slate-800 dark:text-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-semibold text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>BIS Compliance Scope Notice</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {content.importantNotice || "I'm specialized in BIS, Indian Standards, product compliance and BIS services. Please ask me a BIS-related question."}
        </p>
        <div className="pt-2 flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Try asking about:</span>
          <span className="text-xs px-2 py-0.5 rounded bg-white dark:bg-white/5 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-white/10 font-mono">
            IS 16102 (LED Bulbs)
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-white dark:bg-white/5 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-white/10 font-mono">
            IS 2347 (Pressure Cooker)
          </span>
        </div>
      </div>
    );
  }

  const isSaved = content.relevantStandard ? isStandardSaved(content.relevantStandard) : false;

  const handleCopy = () => {
    const textToCopy = `### ${content.productOrTopic} — BIS Information\n\n` +
      `**Relevant Standard:** ${content.relevantStandard || "N/A"}\n` +
      `**Applicability:** ${content.applicability}\n` +
      `**Certification Status:** ${content.certificationStatus} (${content.certificationScheme || "Standard"})\n\n` +
      `**Key Requirements:**\n` + content.keyRequirements.map(r => `• ${r}`).join("\n") +
      `\n\n**Official BIS Source:** ${content.source.url}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast("Compliance briefing copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const text = `Relevant standard is ${content.relevantStandard || content.productOrTopic}. ${content.applicability}. Certification is ${content.certificationStatus}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      showToast("Speech synthesis not supported in this browser.", "info");
    }
  };

  // Determine standard image banner if applicable
  let bannerImage = null;
  const lowerTopic = (content.productOrTopic + " " + (content.relevantStandard || "")).toLowerCase();
  if (lowerTopic.includes("led") || lowerTopic.includes("bulb") || lowerTopic.includes("cooker") || lowerTopic.includes("steel") || lowerTopic.includes("cable") || lowerTopic.includes("water")) {
    bannerImage = "/images/bis-products.jpg";
  } else if (lowerTopic.includes("testing") || lowerTopic.includes("lab") || lowerTopic.includes("electronics") || lowerTopic.includes("13252")) {
    bannerImage = "/images/bis-lab.jpg";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-bis-900/95 dark:to-bis-950/95 border border-slate-200 dark:border-cyan-500/25 shadow-md dark:shadow-glass overflow-hidden text-slate-800 dark:text-slate-200 transition-colors duration-200"
    >
      {/* Top Banner with Image Accent if relevant */}
      {bannerImage && (
        <div className="relative h-28 w-full overflow-hidden border-b border-slate-200 dark:border-white/10">
          <Image
            src={bannerImage}
            alt="BIS Standard Category"
            fill
            className="object-cover opacity-20 dark:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-bis-900 via-white/70 dark:via-bis-900/60 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5 drop-shadow">
              <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
              BIS Certified Compliance Card
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 backdrop-blur-md">
                ✓ {content.confidence}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="p-5 pb-3 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-1.5">
              {content.relevantStandard && (
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
                  {content.relevantStandard}
                </span>
              )}
              {content.certificationScheme && (
                <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-medium">
                  {content.certificationScheme}
                </span>
              )}
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                  content.certificationStatus === "Mandatory"
                    ? "bg-rose-50 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300"
                    : "bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                }`}
              >
                {content.certificationStatus === "Mandatory" ? "● Mandatory (QCO Active)" : "○ Voluntary Scheme"}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {content.productOrTopic} {content.standardTitle && `— ${content.standardTitle}`}
            </h3>
          </div>

          {/* Action Icons (Bookmark, Copy, Speech) */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors ${
                isPlayingAudio ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/15 animate-pulse" : ""
              }`}
              title={isPlayingAudio ? "Stop Audio" : "Read Aloud"}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            {content.relevantStandard && (
              <button
                onClick={() => toggleSaveStandard(content.relevantStandard!)}
                className={`p-2 rounded-xl transition-colors ${
                  isSaved
                    ? "text-saffron-500 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-500/15 hover:bg-saffron-100"
                    : "text-slate-400 hover:text-saffron-500 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
                title={isSaved ? "Saved in Bookmarks" : "Save Standard Bookmark"}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Structured Content Grid */}
      <div className="p-5 space-y-4">
        {/* Applicability Section */}
        <div>
          <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1.5 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Applicability & Scope
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-bis-950/50 p-3 rounded-xl border border-slate-200 dark:border-white/5">
            {content.applicability}
          </p>
        </div>

        {/* Key Requirements */}
        {content.keyRequirements && content.keyRequirements.length > 0 && (
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Key Compliance & Safety Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {content.keyRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-bis-800/60 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testing Parameters if available */}
        {content.testingParameters && content.testingParameters.length > 0 && (
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              Mandatory In-Lab & Factory Test Parameters
            </h4>
            <div className="p-3 rounded-xl bg-purple-50/40 dark:bg-bis-950/70 border border-purple-200/60 dark:border-white/5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {content.testingParameters.map((test, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span>{test}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marking Requirements if available */}
        {content.markingRequirements && content.markingRequirements.length > 0 && (
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-saffron-600 dark:text-saffron-400" />
              Packaging & ISI Marking Guidelines
            </h4>
            <div className="p-3 rounded-xl bg-saffron-50 dark:bg-saffron-950/20 border border-saffron-200 dark:border-saffron-500/20 space-y-1 text-xs text-saffron-900 dark:text-saffron-200">
              {content.markingRequirements.map((mark, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-saffron-500" />
                  <span>{mark}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flowchart Steps if present */}
        {content.flowchartSteps && content.flowchartSteps.length > 0 && (
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2">
              Certification Roadmap
            </h4>
            <div className="space-y-1.5">
              {content.flowchartSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-2 px-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Source / Citation Box */}
        <div className="pt-2 border-t border-slate-200 dark:border-white/10">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-gradient-to-r dark:from-bis-800 dark:to-bis-900 border border-slate-200 dark:border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                    Official BIS Source
                  </span>
                  <span className="text-[10px] px-1.5 rounded bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-500/30">
                    ✓ Verified
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-sm">
                  {content.source.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {content.source.sourceName} • Verified: {content.source.verifiedAt}
                </div>
              </div>
            </div>

            <a
              href={content.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <span>Open Official Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Important Disclaimer Notice */}
        {content.importantNotice && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200/90 flex items-start gap-2 shadow-sm">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-amber-800 dark:text-amber-300 font-semibold">Important:</strong> {content.importantNotice}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
