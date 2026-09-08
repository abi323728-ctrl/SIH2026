"use client";

import React, { useRef, useEffect } from "react";
import { useChat } from "@/lib/context/ChatContext";
import SuggestionCards from "@/components/chat/SuggestionCards";
import StructuredAIResponse from "@/components/chat/StructuredAIResponse";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatInput from "@/components/chat/ChatInput";
import {
  Shield,
  Download,
  Trash2,
  Sparkles,
  Paperclip,
  User,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatArea() {
  const {
    activeConversation,
    isGenerating,
    statusText,
    exportChat,
    activeConversationId,
    deleteConversation
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = activeConversation?.messages || [];
  const isEmpty = messages.length === 0;

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isGenerating]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/60 dark:bg-bis-950/60 relative overflow-hidden transition-colors duration-200">
      {/* Top Chat Bar Header */}
      <div className="px-6 py-3.5 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-bis-900/60 backdrop-blur-md flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">BIS AI Assistant</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                BIS Knowledge Connected
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Answers are grounded in official BIS sources where available.
            </p>
          </div>
        </div>

        {/* Action Controls (Export, Clear) */}
        <div className="flex items-center gap-1.5">
          {!isEmpty && (
            <>
              <button
                onClick={() => exportChat(activeConversationId, "markdown")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Export Compliance Dossier"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={() => deleteConversation(activeConversationId)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                title="Clear Conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {isEmpty ? (
          <SuggestionCards />
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {/* Assistant Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm border border-cyan-400/40">
                      <Shield className="w-4 h-4 text-cyan-100" />
                    </div>
                  )}

                  {/* Message Bubble / Structured Card */}
                  <div className={`max-w-2xl sm:max-w-3xl ${isUser ? "w-fit" : "w-full"}`}>
                    {isUser ? (
                      <div className="space-y-1">
                        <div className="p-4 rounded-2xl rounded-tr-sm bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-sm shadow-md font-medium leading-relaxed">
                          {msg.text}

                          {msg.attachedDocument && (
                            <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-2 text-xs text-blue-100">
                              <Paperclip className="w-3.5 h-3.5" />
                              <span>Attached: {msg.attachedDocument.name} ({msg.attachedDocument.size})</span>
                            </div>
                          )}
                        </div>
                        <div className="text-[10px] text-right text-slate-400 dark:text-slate-500 pr-1 font-mono">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {msg.structuredContent ? (
                          <StructuredAIResponse content={msg.structuredContent} />
                        ) : (
                          <div className="p-4 rounded-2xl bg-white dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-200 shadow-sm leading-relaxed">
                            {msg.text}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 pl-1 font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          <span>BIS Intelligence System</span>
                          <span>•</span>
                          <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 flex-shrink-0 mt-1 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Dynamic Typing Indicator */}
            {isGenerating && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm border border-cyan-400/40">
                  <Shield className="w-4 h-4 text-cyan-100" />
                </div>
                <TypingIndicator statusText={statusText} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Chat Input Bar */}
      <ChatInput />
    </div>
  );
}
