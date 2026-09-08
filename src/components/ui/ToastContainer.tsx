"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";
          const isWarning = toast.type === "warning";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-xl transition-colors duration-200 ${
                isSuccess
                  ? "bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/90 dark:border-emerald-500/40 dark:text-emerald-100"
                  : isError
                  ? "bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950/90 dark:border-rose-500/40 dark:text-rose-100"
                  : isWarning
                  ? "bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/90 dark:border-amber-500/40 dark:text-amber-100"
                  : "bg-cyan-50 text-cyan-950 border-cyan-300 dark:bg-bis-900/95 dark:border-cyan-500/40 dark:text-cyan-100"
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                {isError && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
              </div>

              <div className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors p-0.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
