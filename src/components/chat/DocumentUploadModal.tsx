"use client";

import React, { useState, useRef } from "react";
import { useApp } from "@/lib/context/AppContext";
import { useChat } from "@/lib/context/ChatContext";
import { DocumentAnalysisResult } from "@/types";
import {
  FileUp,
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  Layers,
  Search,
  MessageSquare
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function DocumentUploadModal() {
  const { isDocAnalyzerOpen, setIsDocAnalyzerOpen, addAnalyzedDocument } = useApp();
  const { sendMessage } = useChat();

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isDocAnalyzerOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startAnalysis(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startAnalysis(e.target.files[0]);
    }
  };

  const startAnalysis = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setAnalysisResult(null);

    // Simulate upload progress
    for (let p = 10; p <= 100; p += 20) {
      setUploadProgress(p);
      await new Promise((r) => setTimeout(r, 120));
    }

    // Multi-stage analysis progression
    const stages = [
      "Parsing document structure & technical tables...",
      "Extracting Indian Standard (IS) codes & references...",
      "Validating against active QCO Quality Control Orders...",
      "Computing compliance index & audit risk score..."
    ];

    for (let i = 0; i < stages.length; i++) {
      setAnalysisStep(stages[i]);
      await new Promise((r) => setTimeout(r, 380));
    }

    // Determine mock extracted result based on file name
    const fileName = uploadedFile.name;
    const isLed = fileName.toLowerCase().includes("led") || fileName.toLowerCase().includes("light");
    const isCooker = fileName.toLowerCase().includes("cooker") || fileName.toLowerCase().includes("pressure");

    let isCode = "IS 16102 (Part 1 & 2)";
    let title = "Self-Ballasted LED Lamps Specification";
    if (isCooker) {
      isCode = "IS 2347";
      title = "Domestic Pressure Cookers Standard";
    }

    const mockResult: DocumentAnalysisResult = {
      fileName: uploadedFile.name,
      fileSize: `${(uploadedFile.size / 1024).toFixed(1)} KB`,
      uploadedAt: new Date().toISOString(),
      identifiedStandards: [
        {
          isNumber: isCode,
          matchConfidence: 98,
          mandatoryStatus: true,
          standardTitle: title
        },
        {
          isNumber: "IS 15885 (Part 2/Sec 13)",
          matchConfidence: 89,
          mandatoryStatus: true,
          standardTitle: "AC/DC Supplied Electronic Controlgear for LED Modules"
        }
      ],
      complianceScore: 92,
      summary: `Document "${uploadedFile.name}" exhibits high conformity with Indian Standards regulations. Key safety criteria under ${isCode} are satisfied. Minor documentation update needed for raw material traceability logs.`,
      clausesDetected: [
        {
          clauseNumber: "Clause 7.2",
          description: "Insulation resistance and electric flash dielectric test",
          status: "Compliant",
          recommendation: "Measured values 1500V dielectric strength meets standard limit."
        },
        {
          clauseNumber: "Clause 8.4",
          description: "Glow-wire flammability test for outer housing polymer",
          status: "Compliant",
          recommendation: "Passed with 650°C ignition test without flame propagation."
        },
        {
          clauseNumber: "Clause 11.1",
          description: "Standard ISI Marking and CM/L license layout",
          status: "Gap Identified",
          recommendation: "Marking font size requires 2.5mm height minimum per BIS Gazette."
        }
      ],
      checklist: [
        { item: "Dielectric Strength & Earth Continuity Test", category: "Safety", status: "Passed" },
        { item: "Harmonic Distortion (THD < 20%)", category: "Performance", status: "Passed" },
        { item: "ISI Mark Layout with CML Number", category: "Marking", status: "Action Required" },
        { item: "In-House Calibration Log for Pressure/Voltage Rig", category: "Factory Quality Audit", status: "Pending Lab Test" }
      ]
    };

    setAnalysisResult(mockResult);
    setIsProcessing(false);
    addAnalyzedDocument(mockResult);
  };

  const handleAskFollowUp = (query: string) => {
    setIsDocAnalyzerOpen(false);
    sendMessage(query, {
      name: file?.name || "Uploaded Document",
      size: `${((file?.size || 1024) / 1024).toFixed(1)} KB`,
      type: "PDF/DOCX"
    });
  };

  const handleReset = () => {
    setFile(null);
    setAnalysisResult(null);
    setIsProcessing(false);
    setUploadProgress(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-bis-900 border border-slate-200 dark:border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-bis-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-saffron-50 dark:bg-saffron-500/10 border border-saffron-200 dark:border-saffron-500/30 flex items-center justify-center text-saffron-600 dark:text-saffron-400 shadow-sm">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Analyze a BIS Document & Test Spec
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extract Indian Standards, verify mandatory clauses & generate compliance audit
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDocAnalyzerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!file && !analysisResult && (
            <div>
              {/* Drag and drop dropzone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative p-8 rounded-3xl border-2 border-dashed transition-all duration-300 text-center cursor-pointer overflow-hidden group ${
                  dragActive
                    ? "border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/40 shadow-sm"
                    : "border-slate-300 dark:border-white/15 bg-slate-50/80 dark:bg-bis-950/50 hover:border-cyan-500 hover:bg-slate-100/80 dark:hover:bg-bis-950/80"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleChange}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                />

                {/* Subtle Background Image Overlay */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10 group-hover:opacity-10 transition-opacity">
                  <Image
                    src="/images/bis-lab.jpg"
                    alt="BIS Laboratory"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Drop your BIS document or test spec here
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                      Supports Product Specification Dossiers, NABL Lab Reports, Quality Manuals, and SIT documents (PDF, DOCX, TXT up to 25MB)
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-semibold shadow-sm">
                      Browse Computer
                    </span>
                    <span className="text-xs text-slate-400">or drop sample test report</span>
                  </div>
                </div>
              </div>

              {/* Sample Quick Demo Files */}
              <div className="mt-6">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Or test with sample industry documents:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                  <button
                    onClick={() =>
                      startAnalysis(
                        new File(["sample led spec"], "LED_Bulb_9W_IS16102_Test_Report.pdf", {
                          type: "application/pdf"
                        })
                      )
                    }
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/60 hover:bg-slate-100 dark:hover:bg-bis-950 border border-slate-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-500/40 text-left transition-all group"
                  >
                    <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        LED_Bulb_9W_IS16102_Test_Report.pdf
                      </div>
                      <div className="text-[10px] text-slate-400">2.4 MB • Complete SIT Report</div>
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      startAnalysis(
                        new File(["sample cooker spec"], "Pressure_Cooker_5L_IS2347_Audit.pdf", {
                          type: "application/pdf"
                        })
                      )
                    }
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-bis-950/60 hover:bg-slate-100 dark:hover:bg-bis-950 border border-slate-200 dark:border-white/10 hover:border-saffron-400 dark:hover:border-saffron-500/40 text-left transition-all group"
                  >
                    <FileText className="w-4 h-4 text-saffron-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Pressure_Cooker_5L_IS2347_Audit.pdf
                      </div>
                      <div className="text-[10px] text-slate-400">1.8 MB • Hydrostatic Rig Logs</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mx-auto animate-pulse">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "4s" }} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Analyzing Document against BIS Standards
                </h3>
                <p className="text-sm text-cyan-700 dark:text-cyan-300 mt-1 font-mono">{analysisStep}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-bis-950 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-white/10 max-w-md mx-auto">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Completed Analysis Results View */}
          {analysisResult && (
            <div className="space-y-6">
              {/* Top Score Banner */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-gradient-to-r dark:from-bis-800 dark:to-bis-950 border border-slate-200 dark:border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/40 flex flex-col items-center justify-center text-emerald-700 dark:text-emerald-400 shadow-sm">
                    <span className="text-xl font-bold font-mono">{analysisResult.complianceScore}%</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold">Score</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{analysisResult.fileName}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {analysisResult.fileSize} • {analysisResult.identifiedStandards.length} Standards Identified
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                >
                  Analyze Another
                </button>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-bis-950/70 border border-slate-200 dark:border-white/10">
                <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-1">
                  Executive Compliance Summary
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">{analysisResult.summary}</p>
              </div>

              {/* Identified Standards */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2">
                  Identified Indian Standards (IS)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysisResult.identifiedStandards.map((std, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold font-mono text-cyan-700 dark:text-cyan-300">{std.isNumber}</div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300">{std.standardTitle}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                        {std.matchConfidence}% Match
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2">
                  Compliance Audit Checklist
                </h4>
                <div className="space-y-1.5">
                  {analysisResult.checklist.map((item, i) => (
                    <div
                      key={i}
                      className="p-2.5 px-3 rounded-xl bg-slate-50 dark:bg-bis-950/60 border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{item.item}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          item.status === "Passed"
                            ? "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
                            : item.status === "Action Required"
                            ? "bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30"
                            : "bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    handleFollowUpAction(
                      `Summarize compliance requirements and gaps for ${analysisResult.fileName}`
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask AI Follow-Up</span>
                </button>

                <button
                  onClick={() =>
                    handleFollowUpAction(
                      `Extract full clause-by-clause SIT testing checklist for ${analysisResult.identifiedStandards[0]?.isNumber}`
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-bis-800 hover:bg-slate-200 dark:hover:bg-bis-700 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30 text-xs font-semibold"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Extract SIT Checklist</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  function handleFollowUpAction(prompt: string) {
    handleAskFollowUp(prompt);
  }
}
