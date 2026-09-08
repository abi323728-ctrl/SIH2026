"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useChat } from "@/lib/context/ChatContext";
import { useApp } from "@/lib/context/AppContext";
import BrandLogo from "@/components/common/BrandLogo";
import ThemeToggle from "@/components/common/ThemeToggle";
import {
  MessageSquare,
  Search,
  CheckCircle,
  Layers,
  Bookmark,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Pin,
  FileUp,
  SlidersHorizontal,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewChat,
    deleteConversation,
    togglePinConversation,
    exportChat
  } = useChat();
  const { savedStandards, setIsDocAnalyzerOpen, showToast } = useApp();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState<string>("" );

  // Group conversations by Today, Yesterday, Earlier
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 86400000;

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchHistoryQuery.toLowerCase())
  );

  const todayChats = filteredConversations.filter((c) => new Date(c.updatedAt).getTime() >= todayStart);
  const yesterdayChats = filteredConversations.filter(
    (c) => new Date(c.updatedAt).getTime() >= yesterdayStart && new Date(c.updatedAt).getTime() < todayStart
  );
  const earlierChats = filteredConversations.filter((c) => new Date(c.updatedAt).getTime() < yesterdayStart);

  const handleLogout = () => {
    logout();
    showToast("Successfully signed out.", "info");
    router.push("/");
  };

  const navItems = [
    { label: "AI Assistant", href: "/dashboard", icon: MessageSquare },
    { label: "Standards Search", href: "/standards", icon: Search },
    { label: "BIS Services", href: "/bis-services", icon: Layers },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 280 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col h-screen bg-white/95 dark:bg-bis-900/95 border-r border-slate-200 dark:border-white/10 z-30 select-none flex-shrink-0 transition-colors duration-200"
    >
      {/* Top Header & Brand */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 min-h-[68px]">
        <BrandLogo compact={isCollapsed} />
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-auto"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Action: New Chat Button */}
      <div className="p-3">
        <button
          onClick={() => {
            createNewChat();
            if (pathname !== "/dashboard") {
              router.push("/dashboard");
            }
          }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium shadow-md transition-all duration-200 active:scale-[0.98] ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-semibold tracking-wide">New Compliance Query</span>}
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="px-3 py-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Quick Trigger: Document Analysis */}
        <button
          onClick={() => setIsDocAnalyzerOpen(true)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-slate-600 dark:text-slate-400 hover:text-saffron-600 dark:hover:text-saffron-300 hover:bg-saffron-50 dark:hover:bg-saffron-500/10 ${
            isCollapsed ? "justify-center px-2" : ""
          }`}
          title={isCollapsed ? "Analyze BIS Document" : undefined}
        >
          <FileUp className="w-4 h-4 flex-shrink-0 text-saffron-500" />
          {!isCollapsed && (
            <div className="flex items-center justify-between w-full">
              <span>Analyze Document</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-saffron-500/15 dark:bg-saffron-500/20 text-saffron-600 dark:text-saffron-300">
                PDF/DOCX
              </span>
            </div>
          )}
        </button>
      </nav>

      {/* Divider */}
      <div className="mx-4 my-2 border-t border-slate-200 dark:border-white/5" />

      {/* Saved Standards Bookmark Counter */}
      {!isCollapsed && (
        <div className="px-4 py-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Bookmark className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-700 dark:text-slate-300">
              Saved Standards
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-bis-800 border border-slate-200 dark:border-white/10 text-cyan-700 dark:text-cyan-300 font-mono text-[10px]">
            {savedStandards.length}
          </span>
        </div>
      )}

      {/* Chat History Section */}
      {!isCollapsed && (
        <div className="flex-1 flex flex-col min-h-0 px-3 py-2">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Recent Queries
            </span>
          </div>

          {/* History Search bar */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchHistoryQuery}
              onChange={(e) => setSearchHistoryQuery(e.target.value)}
              placeholder="Search chat history..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-bis-950/60 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Scrollable Chat Sessions List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {/* Today */}
            {todayChats.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 tracking-wider">
                  Today
                </span>
                <div className="mt-1 space-y-1">
                  {todayChats.map((c) => (
                    <ConversationItem
                      key={c.id}
                      conversation={c}
                      isActive={c.id === activeConversationId}
                      onSelect={() => {
                        setActiveConversationId(c.id);
                        if (pathname !== "/dashboard") router.push("/dashboard");
                      }}
                      onDelete={() => deleteConversation(c.id)}
                      onPin={() => togglePinConversation(c.id)}
                      onExport={() => exportChat(c.id, "markdown")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Yesterday */}
            {yesterdayChats.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 tracking-wider">
                  Yesterday
                </span>
                <div className="mt-1 space-y-1">
                  {yesterdayChats.map((c) => (
                    <ConversationItem
                      key={c.id}
                      conversation={c}
                      isActive={c.id === activeConversationId}
                      onSelect={() => {
                        setActiveConversationId(c.id);
                        if (pathname !== "/dashboard") router.push("/dashboard");
                      }}
                      onDelete={() => deleteConversation(c.id)}
                      onPin={() => togglePinConversation(c.id)}
                      onExport={() => exportChat(c.id, "markdown")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Earlier */}
            {earlierChats.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 tracking-wider">
                  Earlier
                </span>
                <div className="mt-1 space-y-1">
                  {earlierChats.map((c) => (
                    <ConversationItem
                      key={c.id}
                      conversation={c}
                      isActive={c.id === activeConversationId}
                      onSelect={() => {
                        setActiveConversationId(c.id);
                        if (pathname !== "/dashboard") router.push("/dashboard");
                      }}
                      onDelete={() => deleteConversation(c.id)}
                      onPin={() => togglePinConversation(c.id)}
                      onExport={() => exportChat(c.id, "markdown")}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredConversations.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-400">
                No matching queries found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom User Profile & Theme Toggle & Controls */}
      <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-bis-950/40">
        <div className="flex items-center justify-between gap-2">
          {user ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm border border-cyan-400/30">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-cyan-700 dark:text-cyan-300 truncate flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {user.role}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium"
            >
              Sign In
            </Link>
          )}

          {!isCollapsed && (
            <div className="flex items-center gap-1">
              <ThemeToggle compact />
              {user && (
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onPin,
  onExport
}: {
  conversation: any;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onPin: () => void;
  onExport: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      onClick={onSelect}
      className={`group relative flex items-center justify-between px-2.5 py-2 rounded-lg text-xs cursor-pointer transition-all ${
        isActive
          ? "bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-200 font-medium"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 pr-1">
        {conversation.isPinned ? (
          <Pin className="w-3 h-3 text-saffron-500 dark:text-saffron-400 flex-shrink-0" />
        ) : (
          <MessageSquare className="w-3 h-3 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 flex-shrink-0" />
        )}
        <span className="truncate">{conversation.title}</span>
      </div>

      {/* Action Buttons on Hover */}
      {showMenu && (
        <div
          className="flex items-center gap-1 bg-white/90 dark:bg-bis-900/90 pl-1 py-0.5 rounded shadow-sm border border-slate-200 dark:border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onPin}
            className="p-1 hover:text-saffron-500 text-slate-400 rounded"
            title={conversation.isPinned ? "Unpin" : "Pin"}
          >
            <Pin className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={onExport}
            className="p-1 hover:text-cyan-600 dark:hover:text-cyan-300 text-slate-400 rounded"
            title="Export Dossier (MD)"
          >
            <FileText className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:text-rose-500 text-slate-400 rounded"
            title="Delete"
          >
            <Trash2 className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
    </div>
  );
}
