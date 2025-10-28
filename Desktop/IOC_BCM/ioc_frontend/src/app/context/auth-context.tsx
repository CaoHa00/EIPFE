// app/context/auth-context.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/app/(auth)/services/auth";
import type { NewUser } from "@/app/(auth)/types/user";
import axios from "axios";
import { toast } from "sonner";
import FullScreenLoader from "../(auth)/_components/fullScreenLoader";

export type AuthUser = {
  id: string;
  fullname: string;
  email: string;
  phonenumber?: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (data: NewUser) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_KEY = "session.user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(SESSION_KEY)
          : null;
      if (raw) setUser(JSON.parse(raw));
    } catch (err) {
      console.debug("AuthProvider: failed to parse session", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      const publicRoutes = ["/login", "/register"];
      const isPublic = publicRoutes.includes(pathname);

      if (!user && !isPublic) {
        router.replace("/login");
      } else if (user && isPublic) {
        router.replace("/");
      }
    }
  }, [user, pathname, loading, router]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,

      // LOGIN: validate the API response and throw backend message on failure
      login: async (identifier, password) => {
        setLoading(true);
        try {
          const res = await loginUser({ email: identifier, password });

          if (!res || res.code !== 200) {
            const msg = res?.message ?? "Login failed";
            toast.error(msg);
            throw new Error(msg);
          }

          const r = res.result;
          if (!r || !r.userAccountId) {
            const msg = res?.message ?? "Invalid login response from server";
            toast.error(msg);
            throw new Error(msg);
          }

          const authUser: AuthUser = {
            id: r.userAccountId,
            fullname: r.fullName ?? r.fullName ?? r.email,
            email: r.email,
            phonenumber: r.phoneNumber ?? undefined,
          };

          localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
          setUser(authUser);
        } catch (err: any) {
          if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            const msg = data?.message ?? err.message ?? "Network error";
            throw new Error(msg);
          }
          throw new Error(err?.message ?? "Login failed");
        } finally {
          setTimeout(() => setLoading(false), 800);
        }
      },

      // REGISTER: keep toast + redirect
      register: async ({ fullname, email, password, phonenumber }: NewUser) => {
        setLoading(true);
        try {
          const res = await registerUser({
            fullname,
            email,
            password,
            phonenumber,
          });
          if (!res || res.code !== 200) {
            const msg = res?.message ?? "Registration failed";
            toast.error(msg);
            throw new Error(msg);
          }
          toast.success("Account created successfully. Please sign in.");
          router.replace("/login");
        } catch (err: any) {
          if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            const msg = data?.message ?? err.message ?? "Network error";
            throw new Error(msg);
          }
          throw new Error(err?.message ?? "Registration failed");
        } finally {
          setTimeout(() => setLoading(false), 800);
        }
      },

      logout: () => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
        toast.success("Logged out successfully!");
        router.replace("/login");
      },
    }),
    [user, loading, router]
  );

  if (loading) {
    return <FullScreenLoader message="Loading..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
