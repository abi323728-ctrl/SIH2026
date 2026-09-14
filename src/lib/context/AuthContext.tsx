"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string, org?: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fillDemoCredentials: () => { email: string; pass: string };
}

const DEMO_USER: User = {
  id: "usr-demo-01",
  name: "Rajesh Sharma",
  email: "demo@bisassist.ai",
  organization: "Bharat Electronics & Consumer Goods Ltd.",
  role: "Compliance Engineer",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  licenseNumber: "CM/L-8472910"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage on mount
    try {
      const stored = localStorage.getItem("bis_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Call backend API
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass })
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        setUser(data.user);
        try {
          localStorage.setItem("bis_auth_user", JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem("bis_auth_token", data.token);
          }
        } catch {
          // ignore
        }
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || "Authentication failed." };
      }
    } catch (err) {
      // Offline fallback
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = pass.trim();

      if ((cleanEmail === "demo@bisassist.ai" && cleanPass === "demo123") || (cleanEmail && cleanPass.length >= 4)) {
        const fallbackUser: User = {
          ...DEMO_USER,
          email: cleanEmail,
          name: cleanEmail === "demo@bisassist.ai" ? "Rajesh Sharma" : cleanEmail.split("@")[0]
        };
        setUser(fallbackUser);
        try {
          localStorage.setItem("bis_auth_user", JSON.stringify(fallbackUser));
        } catch {}
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: "Network or server error during sign in." };
    }
  };

  const register = async (
    name: string,
    email: string,
    pass: string,
    org?: string,
    role?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: pass,
          organization: org,
          role: role
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        setUser(data.user);
        try {
          localStorage.setItem("bis_auth_user", JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem("bis_auth_token", data.token);
          }
        } catch {}
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || "Registration failed." };
      }
    } catch (err) {
      // Offline fallback
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: name,
        email: email,
        organization: org || "Bharat Electronics",
        role: (role as UserRole) || "Compliance Engineer",
        licenseNumber: `CM/L-${Math.floor(1000000 + Math.random() * 9000000)}`
      };
      setUser(newUser);
      try {
        localStorage.setItem("bis_auth_user", JSON.stringify(newUser));
      } catch {}
      setIsLoading(false);
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("bis_auth_user");
      localStorage.removeItem("bis_auth_token");
    } catch {}
  };

  const fillDemoCredentials = () => {
    return { email: "demo@bisassist.ai", pass: "demo123" };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        fillDemoCredentials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
