"use client";

import React, { useState } from "react";
import AppSidebar from "@/components/layout/AppSidebar";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";
import DocumentUploadModal from "@/components/chat/DocumentUploadModal";
import ThemeToggle from "@/components/common/ThemeToggle";
import { BIS_SERVICES_DATABASE } from "@/lib/data/bisServices";
import { BISService } from "@/types";
import {
  Layers,
  ShieldCheck,
  Cpu,
  Sparkles,
  Globe,
  FlaskConical,
  SearchCheck,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Coins,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BisServicesPage() {
  const [selectedService, setSelectedService] = useState<BISService | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Globe":
        return <Globe className="w-5 h-5" />;
      case "FlaskConical":
        return <FlaskConical className="w-5 h-5" />;
      case "SearchCheck":
        return <SearchCheck className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-bis-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      {/* Left Sidebar */}
      <AppSidebar />

      {/* Main Services Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Top Hero Banner */}
        <div className="relative p-6 sm:p-10 border-b border-slate-200 dark:border-white/10 overflow-hidden bg-gradient-to-r from-slate-100 via-white to-slate-50 dark:from-bis-900 dark:via-bis-950 dark:to-bis-900 flex-shrink-0">
          <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
            <Image
              src="/images/bis-hero.jpg"
              alt="BIS Services Ecosystem"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
                <span>National Conformity Assessment & Certification Directory</span>
              </div>

              <ThemeToggle />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Bureau of Indian Standards{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-saffron-600 dark:from-cyan-400 dark:via-blue-400 dark:to-saffron-400">
                Services & Schemes
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2.5 max-w-2xl leading-relaxed">
              Explore third-party certification marks (ISI), electronic product registration (CRS), gold hallmarking (HUID), laboratory testing, and foreign manufacturer clearance.
            </p>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="flex-1 p-6 sm:p-10 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Core Conformity Assessment Schemes
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select a scheme to view step-by-step workflows, prerequisites, timelines, and fees
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BIS_SERVICES_DATABASE.map((serv, idx) => {
                return (
                  <motion.div
                    key={serv.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    onClick={() => setSelectedService(serv)}
                    className="group relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-bis-900/90 dark:to-bis-950/90 border border-slate-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-500/40 p-6 shadow-sm dark:shadow-glass cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]"
                  >
                    {/* Top image background accent if available */}
                    {serv.imagePath && (
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full overflow-hidden pointer-events-none">
                        <Image
                          src={serv.imagePath}
                          alt={serv.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                          {getServiceIcon(serv.iconName)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                            {serv.code}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                            {serv.badge}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-200 transition-colors leading-snug">
                        {serv.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                        {serv.shortDescription}
                      </p>

                      {/* Applicable highlights */}
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span className="text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                            Turnaround:
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                            {serv.turnaroundTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 group-hover:text-cyan-800 dark:group-hover:text-cyan-300 flex items-center gap-1">
                        <span>Explore Scheme Roadmap</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scheme Comparison Matrix Overview */}
          <div className="p-8 rounded-3xl bg-white dark:bg-bis-900/60 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Comparison: Scheme-I (ISI) vs Scheme-II (CRS) vs Hallmarking
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Quick reference for compliance officers to choose the appropriate conformity assessment route.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4 text-cyan-700 dark:text-cyan-300">Scheme-I (ISI Mark)</th>
                    <th className="py-3 px-4 text-purple-700 dark:text-purple-300">Scheme-II (CRS)</th>
                    <th className="py-3 px-4 text-saffron-600 dark:text-saffron-300">Hallmarking (HUID)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Auditing Route</td>
                    <td className="py-3.5 px-4">Factory Audit + Independent Sample Draw</td>
                    <td className="py-3.5 px-4">NABL Test Report Self-Declaration</td>
                    <td className="py-3.5 px-4">Assaying & Hallmarking Centre (AHC)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Governing Mark</td>
                    <td className="py-3.5 px-4">Standard ISI Emblem + CM/L Number</td>
                    <td className="py-3.5 px-4">CRS Standard Mark + R-XXXXXXXX</td>
                    <td className="py-3.5 px-4">BIS Triangle + Purity + 6-digit HUID</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Typical Products</td>
                    <td className="py-3.5 px-4">Cement, Steel, Cookers, Cables, Helmets</td>
                    <td className="py-3.5 px-4">Laptops, Phones, Adapters, Solar Modules</td>
                    <td className="py-3.5 px-4">14k, 18k, 20k, 22k, 24k Gold & Silver</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Digital Portal</td>
                    <td className="py-3.5 px-4">manakonline.in</td>
                    <td className="py-3.5 px-4">crsbis.in</td>
                    <td className="py-3.5 px-4">manakonline.in/hallmarking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      {/* Document Analyzer Modal */}
      <DocumentUploadModal />
    </div>
  );
}
