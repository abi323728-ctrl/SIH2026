"use client";

import React from "react";
import { BISService } from "@/types";
import { useChat } from "@/lib/context/ChatContext";
import { useRouter } from "next/navigation";
import {
  X,
  Layers,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileText,
  MessageSquare
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceDetailModalProps {
  service: BISService | null;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { sendMessage } = useChat();
  const router = useRouter();

  if (!service) return null;

  const handleAskAIAboutThis = () => {
    onClose();
    sendMessage(`Explain the application process, factory requirements, and timeline for ${service.name} (${service.schemeType})`);
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
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-bis-950/80">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs">
                  {service.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  {service.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400">
                  {service.turnaroundTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {service.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-bis-950/60 border border-slate-200 dark:border-white/5 space-y-2">
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              Scheme Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
              Strategic Advantages & Legal Validity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {service.keyBenefits.map((b, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step by Step Process */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Step-by-Step Certification Workflow
            </h4>
            <div className="space-y-2">
              {service.stepByStepProcess.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-bis-950/50 border border-slate-200 dark:border-white/5 flex items-start gap-3.5 text-xs"
                >
                  <div className="w-7 h-7 rounded-xl bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 font-bold flex items-center justify-center flex-shrink-0 font-mono">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs">{step.title}</h5>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Prerequisites */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              Mandatory Factory / Brand Prerequisites
            </h4>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 space-y-2 text-xs text-purple-900 dark:text-purple-200">
              {service.mandatoryPrerequisites.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{p}</span>
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
            <span>Consult AI for {service.code}</span>
          </button>

          <a
            href={service.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>Open e-BIS Manakonline</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
