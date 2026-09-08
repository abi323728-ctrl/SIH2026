"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useApp } from "@/lib/context/AppContext";
import BrandLogo from "@/components/common/BrandLogo";
import ThemeToggle from "@/components/common/ThemeToggle";
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  FileCheck2,
  Eye,
  EyeOff,
  UserCheck,
  Layers,
  Award,
  Globe,
  HelpCircle,
  Briefcase
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, fillDemoCredentials } = useAuth();
  const { showToast } = useApp();

  // Mode state
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");

  // Sign In state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Register state
  const [regName, setRegName] = useState("");
  const [regOrg, setRegOrg] = useState("");
  const [regRole, setRegRole] = useState("Compliance Officer");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter email and password.", "warning");
      return;
    }

    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      showToast("Authentication successful! Welcome to BIS IntelliAssist.", "success");
      router.push("/dashboard");
    } else {
      showToast(res.error || "Authentication failed. Please verify credentials.", "error");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      showToast("Please fill in all required fields.", "warning");
      return;
    }

    if (regPassword.length < 4) {
      showToast("Password must be at least 4 characters.", "warning");
      return;
    }

    setIsLoading(true);
    const res = await register(regName, regEmail, regPassword, regOrg, regRole);
    setIsLoading(false);

    if (res.success) {
      showToast(`Welcome, ${regName}! Compliance workspace created.`, "success");
      router.push("/dashboard");
    } else {
      showToast(res.error || "Registration failed.", "error");
    }
  };

  const handleQuickDemoOfficer = async () => {
    const creds = fillDemoCredentials();
    setEmail(creds.email);
    setPassword(creds.pass);
    setIsLoading(true);
    const res = await login(creds.email, creds.pass);
    setIsLoading(false);

    if (res.success) {
      showToast("Logged in with Demo Compliance Officer account.", "success");
      router.push("/dashboard");
    }
  };

  const handleQuickDemoManufacturer = async () => {
    setIsLoading(true);
    const res = await login("manufacturer@enterprise.in", "demo123");
    setIsLoading(false);

    if (res.success) {
      showToast("Logged in with Manufacturer Compliance profile.", "success");
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-bis-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden bg-grid-subtle transition-colors duration-200">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-saffron-500/10 dark:bg-saffron-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Floating Theme Switcher at Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-2 bg-white/80 dark:bg-bis-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 pl-2 hidden sm:inline">
          Theme:
        </span>
        <ThemeToggle showLabel />
      </div>

      {/* Main Split Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-6xl min-h-[700px] bg-white/95 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 relative z-10"
      >
        {/* LEFT COLUMN: Compliance Brand & Visual Showcase */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-bis-900 dark:via-bis-950 dark:to-bis-900 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
            <Image
              src="/images/bis-hero.jpg"
              alt="BIS Compliance Hologram"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100/90 dark:from-bis-950 via-slate-100/60 dark:via-bis-950/70 to-transparent" />
          </div>

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <BrandLogo />
          </div>

          {/* Middle Hero Content */}
          <div className="relative z-10 my-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
              <span>National Standards & Quality Control AI Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Intelligence for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-saffron-600 dark:from-cyan-400 dark:via-blue-400 dark:to-saffron-400">
                Indian Standards.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
              Understand Bureau of Indian Standards (IS), certification schemes (ISI Mark, CRS, Gold Hallmarking), mandatory Quality Control Orders (QCOs), and test specifications — instantly.
            </p>

            {/* Interactive Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block font-semibold">22,500+ Indian Standards</strong>
                  Instant IS number, clause & SIT test lookup
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md">
                <FileCheck2 className="w-4 h-4 text-saffron-600 dark:text-saffron-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block font-semibold">Grounded in BIS Gazettes</strong>
                  Distinguishes official mandates from AI guidance
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>TLS 256-bit Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>NABL Lab Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-saffron-600 dark:text-saffron-400" />
              <span>Official BIS Gazette Registry</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Authentication Portal Card */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white dark:bg-bis-950/95">
          <div>
            {/* Header Tabs (Sign In / Register) */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {authMode === "signin" ? "Officer & User Login" : "Create Compliance Account"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {authMode === "signin"
                    ? "Sign in to access your compliance workspace"
                    : "Register for IS standards and QCO tracking"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAuthMode(authMode === "signin" ? "register" : "signin")}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-white/10 transition-colors"
              >
                {authMode === "signin" ? "Register" : "Sign In"}
              </button>
            </div>

            {/* Quick Demo One-Click Access Buttons */}
            {authMode === "signin" && (
              <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-slate-50 dark:from-blue-950/40 dark:via-cyan-950/30 dark:to-bis-900 border border-cyan-200 dark:border-cyan-500/30 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
                    Quick 1-Click Demo Logins
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-white/5 px-2 py-0.5 rounded">
                    Instant Preview
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleQuickDemoOfficer}
                    disabled={isLoading}
                    className="py-2 px-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Compliance Officer</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickDemoManufacturer}
                    disabled={isLoading}
                    className="py-2 px-2.5 rounded-xl bg-slate-800 dark:bg-bis-800 hover:bg-slate-700 dark:hover:bg-bis-700 text-white text-xs font-semibold border border-slate-700 dark:border-white/10 shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-saffron-400" />
                    <span>Manufacturer</span>
                  </button>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 border-t border-slate-200 dark:border-white/10" />
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                {authMode === "signin" ? "Or Enter Credentials" : "Enter Profile Details"}
              </span>
              <div className="flex-1 border-t border-slate-200 dark:border-white/10" />
            </div>

            {/* SIGN IN FORM */}
            {authMode === "signin" ? (
              <form onSubmit={handleSignIn} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Email Address / Username
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com or demo@bisassist.ai"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => showToast("Demo Password is 'demo123'. Reset email triggered.", "info")}
                      className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] mt-4"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying with BIS Registry...</span>
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Compliance Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Organization / Brand
                    </label>
                    <input
                      type="text"
                      value={regOrg}
                      onChange={(e) => setRegOrg(e.target.value)}
                      placeholder="e.g. Bharat Electronics Ltd"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Role / Department
                    </label>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
                    >
                      <option value="Compliance Officer">Compliance Officer</option>
                      <option value="Manufacturer / QA">Manufacturer / QA</option>
                      <option value="NABL Lab Analyst">NABL Lab Analyst</option>
                      <option value="Standards Auditor">Standards Auditor</option>
                      <option value="Citizen / Consumer">Citizen / Consumer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@company.in"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Create Password
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 4 characters"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] mt-3"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer Note */}
          <div className="pt-4 mt-6 border-t border-slate-200 dark:border-white/10 text-center text-xs text-slate-500 dark:text-slate-400">
            <p>
              Powered by <strong className="text-cyan-700 dark:text-cyan-300 font-semibold">BIS-Grounded AI Engine</strong>
            </p>
            <div className="flex items-center justify-center gap-3 mt-1.5 text-[11px] text-slate-400 dark:text-slate-400">
              <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">IS Gazette Portal</span>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
