"use client";

import React, { useState } from "react";
import AppSidebar from "@/components/layout/AppSidebar";
import StandardCard from "@/components/standards/StandardCard";
import StandardDetailModal from "@/components/standards/StandardDetailModal";
import DocumentUploadModal from "@/components/chat/DocumentUploadModal";
import ThemeToggle from "@/components/common/ThemeToggle";
import { BIS_STANDARDS_DATABASE } from "@/lib/data/bisStandards";
import { Standard } from "@/types";
import {
  Search,
  SlidersHorizontal,
  Filter,
  ShieldCheck,
  Sparkles,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  FileCheck2
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function StandardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedScheme, setSelectedScheme] = useState<string>("All");
  const [selectedQCO, setSelectedQCO] = useState<string>("All");
  const [activeStandard, setActiveStandard] = useState<Standard | null>(null);

  const industries = ["All", "Consumer Electronics & Lighting", "Consumer Goods & Metallurgy", "Electrical Wiring & Safety", "Construction & Civil Infrastructure", "Gems, Jewellery & Assay", "Automotive & Road Safety"];
  const schemes = ["All", "Scheme-I (ISI Mark)", "Scheme-II (CRS - Compulsory Registration)", "Hallmarking (Gold & Silver)"];
  const qcoStatuses = ["All", "Mandatory (QCO Active)", "Voluntary"];

  const filteredStandards = BIS_STANDARDS_DATABASE.filter((std) => {
    const matchesSearch =
      std.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.productCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.scope.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = selectedIndustry === "All" || std.industry === selectedIndustry;
    const matchesScheme = selectedScheme === "All" || std.scheme === selectedScheme;
    const matchesQCO = selectedQCO === "All" || (selectedQCO === "Mandatory (QCO Active)" ? std.qcoStatus.includes("Mandatory") : !std.qcoStatus.includes("Mandatory"));

    return matchesSearch && matchesIndustry && matchesScheme && matchesQCO;
  });

  return (
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-bis-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      {/* Left Sidebar */}
      <AppSidebar />

      {/* Main Standards Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Top Hero Banner */}
        <div className="relative p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 overflow-hidden bg-gradient-to-r from-slate-100 via-white to-slate-50 dark:from-bis-900 dark:via-bis-950 dark:to-bis-900 flex-shrink-0">
          <div className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none">
            <Image
              src="/images/bis-products.jpg"
              alt="Certified Indian Standards Showcase"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-5xl">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-saffron-500" />
                <span>National Standards Repository • 22,500+ Official Specifications</span>
              </div>

              <ThemeToggle />
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Indian Standards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-saffron-600 dark:from-cyan-400 dark:to-blue-400">QCO Directory</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Explore mandatory Bureau of Indian Standards (IS codes), testing clauses, SIT guidelines, and Quality Control Orders across manufacturing sectors.
            </p>

            {/* Search Input Box */}
            <div className="mt-6 relative max-w-3xl">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-cyan-600 dark:text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by IS number (e.g. IS 16102), product name (e.g. LED bulb, cement), material or ministry..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-bis-900/90 border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-3.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-bis-950/80 sticky top-0 z-20 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
          {/* Industry Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Industry:
            </span>
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  selectedIndustry === ind
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Scheme & QCO dropdowns */}
          <div className="flex items-center gap-3">
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="bg-slate-100 dark:bg-bis-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              {schemes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={selectedQCO}
              onChange={(e) => setSelectedQCO(e.target.value)}
              className="bg-slate-100 dark:bg-bis-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              {qcoStatuses.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Standards Grid */}
        <div className="flex-1 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Showing {filteredStandards.length} Indian Standards
            </span>
          </div>

          {filteredStandards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStandards.map((std) => (
                <StandardCard
                  key={std.id}
                  standard={std}
                  onSelect={(s) => setActiveStandard(s)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-bis-900/40 border border-slate-200 dark:border-white/10 max-w-lg mx-auto shadow-sm">
              <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No Indian Standards Found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try searching for &quot;LED&quot;, &quot;Cement&quot;, &quot;Pressure Cooker&quot;, &quot;Cables&quot;, &quot;Helmet&quot;, or &quot;Hallmark&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedIndustry("All");
                  setSelectedScheme("All");
                  setSelectedQCO("All");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Standard Detail Modal */}
      {activeStandard && (
        <StandardDetailModal
          standard={activeStandard}
          onClose={() => setActiveStandard(null)}
        />
      )}

      {/* Global Document Upload Analyzer Modal */}
      <DocumentUploadModal />
    </div>
  );
}
