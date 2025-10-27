// app/(auth)/hooks/useAuthService.ts
"use client";

import { useCallback, useState } from "react";
import { registerUser, loginUser } from "@/app/(auth)/services/auth";
import type { NewUser } from "@/app/(auth)/types/user";
import type { CreateUserResult, LoginResult } from "@/app/(auth)/services/auth";

type ApiResult<T> = { code: number; message: string; result: T };

/** useRegister: returns execute(payload) and status */
export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (payload: NewUser) => {
    setError(null);
    setLoading(true);
    try {
      const res = await registerUser(payload);
      if (res.code !== 200) {
        throw new Error(res.message || "Registration failed");
      }
      return res as ApiResult<CreateUserResult>;
    } catch (err: any) {
      setError(err?.message ?? "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}

/** useLogin: returns execute({email,password}) and status */
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (payload: { email: string; password: string }) => {
      setError(null);
      setLoading(true);
      try {
        const res = await loginUser(payload);
        if (res.code !== 200) {
          throw new Error(res.message || "Login failed");
        }
        return res as ApiResult<LoginResult>;
      } catch (err: any) {
        setError(err?.message ?? "Login failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { execute, loading, error };
}
