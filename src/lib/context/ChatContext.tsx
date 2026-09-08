"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Conversation, Message, StructuredAIContent } from "@/types";
import { INITIAL_CONVERSATIONS } from "@/lib/data/sampleConversations";
import { processBISQuery } from "@/lib/services/bisEngine";

interface ChatContextType {
  conversations: Conversation[];
  activeConversationId: string;
  activeConversation: Conversation | undefined;
  isGenerating: boolean;
  statusText: string;
  setActiveConversationId: (id: string) => void;
  createNewChat: (initialMessage?: string) => string;
  sendMessage: (text: string, attachedDoc?: { name: string; size: string; type: string }) => Promise<void>;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  togglePinConversation: (id: string) => void;
  exportChat: (id: string, format: "markdown" | "json") => void;
  clearAllChats: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("Searching Indian Standards Database...");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bis_conversations");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
          setActiveConversationId(parsed[0].id);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveToStorage = (updated: Conversation[]) => {
    setConversations(updated);
    try {
      localStorage.setItem("bis_conversations", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const createNewChat = (initialPrompt?: string): string => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: initialPrompt ? initialPrompt.slice(0, 35) + "..." : "New BIS Compliance Query",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: "General Query",
      messages: []
    };

    const updated = [newConv, ...conversations];
    saveToStorage(updated);
    setActiveConversationId(newId);

    if (initialPrompt) {
      setTimeout(() => {
        sendMessageInternal(newId, initialPrompt, updated);
      }, 100);
    }

    return newId;
  };

  const sendMessageInternal = async (
    targetConvId: string,
    userText: string,
    currentConvList: Conversation[],
    attachedDoc?: { name: string; size: string; type: string }
  ) => {
    if (!userText.trim() && !attachedDoc) return;

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      conversationId: targetConvId,
      sender: "user",
      timestamp: new Date().toISOString(),
      text: userText,
      attachedDocument: attachedDoc
    };

    // Update conversation with user message
    const updatedWithUser = currentConvList.map((conv) => {
      if (conv.id === targetConvId) {
        const title = conv.messages.length === 0 ? userText.slice(0, 40) : conv.title;
        return {
          ...conv,
          title,
          updatedAt: new Date().toISOString(),
          messages: [...conv.messages, userMsg]
        };
      }
      return conv;
    });

    saveToStorage(updatedWithUser);
    setIsGenerating(true);

    // Realistic multi-step typing status sequence
    const statuses = [
      "Searching Indian Standards Database...",
      "Checking Applicability & Mandatory QCOs...",
      "Verifying Bureau of Indian Standards Sources...",
      "Synthesizing Compliance Checklist..."
    ];

    for (let i = 0; i < statuses.length; i++) {
      setStatusText(statuses[i]);
      await new Promise((resolve) => setTimeout(resolve, 380));
    }

    // Process using BIS Intelligence Engine
    const queryResult = processBISQuery(userText);

    let aiStructured: StructuredAIContent;
    let aiText: string | undefined;

    if (queryResult.isOffTopic) {
      aiText = queryResult.refusalMessage;
      aiStructured = queryResult.structuredContent!;
    } else {
      aiStructured = queryResult.structuredContent!;
    }

    const aiMsg: Message = {
      id: `msg-ai-${Date.now()}`,
      conversationId: targetConvId,
      sender: "assistant",
      timestamp: new Date().toISOString(),
      text: aiText,
      structuredContent: aiStructured
    };

    const updatedWithAI = updatedWithUser.map((conv) => {
      if (conv.id === targetConvId) {
        return {
          ...conv,
          updatedAt: new Date().toISOString(),
          detectedStandard: aiStructured.relevantStandard,
          messages: [...conv.messages, aiMsg]
        };
      }
      return conv;
    });

    saveToStorage(updatedWithAI);
    setIsGenerating(false);
  };

  const sendMessage = async (text: string, attachedDoc?: { name: string; size: string; type: string }) => {
    let targetId = activeConversationId;
    let currentList = conversations;

    if (!activeConversation) {
      targetId = createNewChat();
      currentList = [
        {
          id: targetId,
          title: text.slice(0, 35) + "...",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category: "General Query",
          messages: []
        },
        ...conversations
      ];
    }

    await sendMessageInternal(targetId, text, currentList, attachedDoc);
  };

  const deleteConversation = (id: string) => {
    const filtered = conversations.filter((c) => c.id !== id);
    if (filtered.length === 0) {
      const fallback: Conversation = {
        id: `conv-${Date.now()}`,
        title: "New BIS Compliance Query",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: "General",
        messages: []
      };
      saveToStorage([fallback]);
      setActiveConversationId(fallback.id);
    } else {
      saveToStorage(filtered);
      if (activeConversationId === id) {
        setActiveConversationId(filtered[0].id);
      }
    }
  };

  const renameConversation = (id: string, newTitle: string) => {
    const updated = conversations.map((c) => (c.id === id ? { ...c, title: newTitle } : c));
    saveToStorage(updated);
  };

  const togglePinConversation = (id: string) => {
    const updated = conversations.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c));
    saveToStorage(updated);
  };

  const clearAllChats = () => {
    const fresh: Conversation = {
      id: `conv-${Date.now()}`,
      title: "New BIS Compliance Query",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: "General",
      messages: []
    };
    saveToStorage([fresh]);
    setActiveConversationId(fresh.id);
  };

  const exportChat = (id: string, format: "markdown" | "json") => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;

    let content = "";
    let mimeType = "text/plain";
    let extension = "txt";

    if (format === "json") {
      content = JSON.stringify(conv, null, 2);
      mimeType = "application/json";
      extension = "json";
    } else {
      extension = "md";
      mimeType = "text/markdown";
      content = `# BIS IntelliAssist — Compliance Dossier\n\n**Topic:** ${conv.title}\n**Date:** ${new Date(
        conv.updatedAt
      ).toLocaleString()}\n**Detected Standard:** ${conv.detectedStandard || "N/A"}\n\n---\n\n`;

      conv.messages.forEach((msg) => {
        if (msg.sender === "user") {
          content += `### User Query\n${msg.text}\n\n`;
        } else {
          content += `### BIS IntelliAssist AI Response\n\n`;
          if (msg.text) content += `${msg.text}\n\n`;
          if (msg.structuredContent) {
            const sc = msg.structuredContent;
            content += `#### Relevant Standard\n**${sc.relevantStandard || sc.productOrTopic}** — ${sc.standardTitle || ""}\n\n`;
            content += `**Applicability:** ${sc.applicability}\n\n`;
            content += `**Certification Status:** ${sc.certificationStatus} (${sc.certificationScheme || "Standard Scheme"})\n\n`;
            content += `#### Key Testing Requirements\n`;
            sc.keyRequirements.forEach((r) => (content += `- ${r}\n`));
            content += `\n**Official BIS Source:** ${sc.source.url}\n`;
            content += `**Confidence:** ${sc.confidence}\n\n`;
          }
          content += `---\n\n`;
        }
      });
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `BIS-IntelliAssist-${conv.title.replace(/[^a-z0-9]/gi, "_")}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        activeConversation,
        isGenerating,
        statusText,
        setActiveConversationId,
        createNewChat,
        sendMessage,
        deleteConversation,
        renameConversation,
        togglePinConversation,
        exportChat,
        clearAllChats
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
