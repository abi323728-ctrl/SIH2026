import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { ChatProvider } from "@/lib/context/ChatContext";
import { AppProvider } from "@/lib/context/AppContext";
import ToastContainer from "@/components/ui/ToastContainer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIS IntelliAssist — Intelligence for Indian Standards & Compliance",
  description: "AI-powered compliance intelligence platform specialized for Bureau of Indian Standards (BIS), Indian Standards (IS), QCOs, product certification, and testing workflows.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-slate-50 dark:bg-bis-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200 antialiased transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <AppProvider>
              <ChatProvider>
                {children}
                <ToastContainer />
              </ChatProvider>
            </AppProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
