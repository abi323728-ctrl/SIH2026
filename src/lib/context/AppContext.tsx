"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Standard, DocumentAnalysisResult } from "@/types";
import { BIS_STANDARDS_DATABASE } from "@/lib/data/bisStandards";

interface Toast {
  id: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
}

interface AppContextType {
  savedStandardIds: string[];
  savedStandards: Standard[];
  toggleSaveStandard: (id: string) => void;
  isStandardSaved: (id: string) => boolean;
  selectedStandardForInspector: Standard | null;
  setSelectedStandardForInspector: (std: Standard | null) => void;
  isDocAnalyzerOpen: boolean;
  setIsDocAnalyzerOpen: (open: boolean) => void;
  analyzedDocuments: DocumentAnalysisResult[];
  addAnalyzedDocument: (result: DocumentAnalysisResult) => void;
  toasts: Toast[];
  showToast: (message: string, type?: "success" | "info" | "warning" | "error") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedStandardIds, setSavedStandardIds] = useState<string[]>(["std-is-16102", "std-is-2347"]);
  const [selectedStandardForInspector, setSelectedStandardForInspector] = useState<Standard | null>(
    BIS_STANDARDS_DATABASE[0]
  );
  const [isDocAnalyzerOpen, setIsDocAnalyzerOpen] = useState<boolean>(false);
  const [analyzedDocuments, setAnalyzedDocuments] = useState<DocumentAnalysisResult[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem("bis_saved_standards");
      if (storedSaved) {
        setSavedStandardIds(JSON.parse(storedSaved));
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (message: string, type: "success" | "info" | "warning" | "error" = "info") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveStandard = (id: string) => {
    setSavedStandardIds((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((i) => i !== id);
        showToast("Standard removed from bookmarks", "info");
      } else {
        next = [...prev, id];
        showToast("Standard saved to your compliance bookmarks", "success");
      }
      try {
        localStorage.setItem("bis_saved_standards", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isStandardSaved = (id: string) => savedStandardIds.includes(id);

  const savedStandards = BIS_STANDARDS_DATABASE.filter((std) => savedStandardIds.includes(std.id));

  const addAnalyzedDocument = (result: DocumentAnalysisResult) => {
    setAnalyzedDocuments((prev) => [result, ...prev]);
    showToast(`Document "${result.fileName}" analyzed with ${result.complianceScore}% compliance index!`, "success");
  };

  return (
    <AppContext.Provider
      value={{
        savedStandardIds,
        savedStandards,
        toggleSaveStandard,
        isStandardSaved,
        selectedStandardForInspector,
        setSelectedStandardForInspector,
        isDocAnalyzerOpen,
        setIsDocAnalyzerOpen,
        analyzedDocuments,
        addAnalyzedDocument,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
