"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

export type AuthUser = { id: string; username: string; email: string };

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER = {
  id: "1",
  username: "enterprise",
  email: "enterprise@becamex.com",
  password: "demo123",
};

const USERS_KEY = "demo.users";
const SESSION_KEY = "demo.session";

function readUsers(): Array<typeof MOCK_USER> {
  if (typeof window === "undefined") return [MOCK_USER];
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [MOCK_USER];
  try {
    const parsed = JSON.parse(raw) as Array<typeof MOCK_USER>;
    // ensure the demo user always exists
    const hasDemo = parsed.some((u) => u.email === MOCK_USER.email);
    return hasDemo ? parsed : [...parsed, MOCK_USER];
  } catch {
    return [MOCK_USER];
  }
}

function writeUsers(users: Array<typeof MOCK_USER>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // boot session
  useEffect(() => {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
    // seed users on first load
    if (typeof window !== "undefined" && !localStorage.getItem(USERS_KEY)) {
      writeUsers([MOCK_USER]);
    }
    setLoading(false);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      login: async (identifier, password) => {
        const users = readUsers();
        const found = users.find(
          (u) =>
            (u.email.toLowerCase() === identifier.toLowerCase() ||
              u.username.toLowerCase() === identifier.toLowerCase()) &&
            u.password === password
        );
        await new Promise((r) => setTimeout(r, 500)); // fake latency
        if (!found) {
          throw new Error("Invalid credentials");
        }
        const authUser: AuthUser = {
          id: found.id,
          username: found.username,
          email: found.email,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
        setUser(authUser);
        router.replace("/");
      },
      register: async ({ username, email, password }) => {
        const users = readUsers();
        const exists = users.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        await new Promise((r) => setTimeout(r, 500));
        if (exists) throw new Error("Email already registered");
        const newUser = {
          id: String(Date.now()),
          username,
          email,
          password,
        };
        writeUsers([...users, newUser]);
        // after register, send to login
        router.replace("/login");
      },
      logout: () => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
        router.replace("/login");
      },
    }),
    [user, loading, router]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
