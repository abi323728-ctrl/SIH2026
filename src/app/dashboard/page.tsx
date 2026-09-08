"use client";

import React, { useState } from "react";
import AppSidebar from "@/components/layout/AppSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ChatArea from "@/components/chat/ChatArea";
import RightIntelligencePanel from "@/components/layout/RightIntelligencePanel";
import DocumentUploadModal from "@/components/chat/DocumentUploadModal";
import StandardDetailModal from "@/components/standards/StandardDetailModal";
import { useApp } from "@/lib/context/AppContext";

export default function DashboardPage() {
  const { selectedStandardForInspector } = useApp();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-bis-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      {/* 1. Left Collapsible Sidebar */}
      <AppSidebar />

      {/* 2. Main Workspace & Chat Column */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Dashboard Top Header & Stats */}
        <DashboardHeader />

        {/* AI Chatbox Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <ChatArea />
        </div>
      </main>

      {/* 3. Right Intelligence Inspector Column (Desktop) */}
      <RightIntelligencePanel />

      {/* Modals */}
      <DocumentUploadModal />
      
      {isDetailModalOpen && (
        <StandardDetailModal
          standard={selectedStandardForInspector}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
}
