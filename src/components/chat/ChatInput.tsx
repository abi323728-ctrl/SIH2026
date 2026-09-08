"use client";

import React, { useState, useRef } from "react";
import { useChat } from "@/lib/context/ChatContext";
import { useApp } from "@/lib/context/AppContext";
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  Sparkles,
  Search,
  FileUp,
  X
} from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onAttachDocument?: () => void;
}

export default function ChatInput({ onAttachDocument }: ChatInputProps) {
  const { sendMessage, isGenerating } = useChat();
  const { setIsDocAnalyzerOpen, showToast } = useApp();
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if ((!inputText.trim() && !attachedFile) || isGenerating) return;
    const textToSend = inputText;
    const fileToSend = attachedFile || undefined;
    setInputText("");
    setAttachedFile(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await sendMessage(textToSend, fileToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Adjust height dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  };

  const handleVoiceToggle = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      showToast("Speech recognition not supported in this browser. Please type your query.", "info");
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      try {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          showToast("Listening... Speak your BIS question", "info");
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
        showToast("Voice recognition error.", "error");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type || "Document"
      });
      showToast(`Attached ${file.name}. Type your question or send to analyze.`, "success");
    }
  };

  const hasContent = inputText.trim().length > 0 || attachedFile !== null;

  return (
    <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white/90 dark:bg-bis-950/80 backdrop-blur-xl relative transition-colors duration-200">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx,.txt"
        className="hidden"
      />

      {/* Attached file chip if any */}
      {attachedFile && (
        <div className="mb-2 flex items-center gap-2 p-2 px-3 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/40 text-xs text-cyan-800 dark:text-cyan-200 w-fit shadow-sm">
          <Paperclip className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span className="font-semibold">{attachedFile.name}</span>
          <span className="text-[10px] text-cyan-600/70 dark:text-cyan-400/70 font-mono">({attachedFile.size})</span>
          <button
            onClick={() => setAttachedFile(null)}
            className="p-0.5 hover:text-rose-500 rounded transition-colors ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Input Box */}
      <div className="relative flex items-end gap-2 p-2 rounded-2xl bg-slate-100/90 dark:bg-bis-900/90 border border-slate-200 dark:border-white/10 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-sm">
        {/* Left Action Buttons */}
        <div className="flex items-center gap-1 pb-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-200/70 dark:hover:bg-white/5 transition-colors"
            title="Attach Spec/Test Report (PDF, DOCX, TXT)"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsDocAnalyzerOpen(true)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-saffron-600 dark:hover:text-saffron-300 hover:bg-slate-200/70 dark:hover:bg-white/5 transition-colors hidden sm:flex"
            title="Launch Full Document Analyzer"
          >
            <FileUp className="w-4 h-4" />
          </button>
        </div>

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask anything about BIS, Indian Standards, QCOs or product compliance..."
          disabled={isGenerating}
          className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none max-h-36 py-2 px-1 leading-relaxed"
        />

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 pb-1">
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2 rounded-xl transition-colors ${
              isListening
                ? "bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/40 animate-pulse"
                : "text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-200/70 dark:hover:bg-white/5"
            }`}
            title={isListening ? "Listening... click to stop" : "Voice Input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <motion.button
            type="button"
            onClick={handleSend}
            disabled={!hasContent || isGenerating}
            animate={{
              scale: hasContent ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 0.2 }}
            className={`p-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
              hasContent && !isGenerating
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:from-blue-500 hover:to-cyan-400 cursor-pointer active:scale-95"
                : "bg-slate-200/80 dark:bg-white/5 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-white/5"
            }`}
            title="Send Query (Enter)"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Small Hint Subtext */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-2 px-1 select-none">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Answers grounded exclusively in official BIS registries
        </span>
        <span className="hidden sm:inline">Press Enter ↵ to send • Shift+Enter for new line</span>
      </div>
    </div>
  );
}
