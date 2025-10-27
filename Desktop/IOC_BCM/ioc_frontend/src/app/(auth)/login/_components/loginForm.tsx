// app/(auth)/_components/loginForm.tsx  (or wherever your component lives)
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";
import { toast } from "sonner";

const schema = z.object({
  identifier: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const { login } = useAuth();
  const [show, setShow] = React.useState(false);
  const [bannerError, setBannerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setBannerError(null);
    try {
      await login(values.identifier, values.password);
      toast.success("Login successful. Welcome back!");
    } catch (e: any) {
      const msg = String(e?.message ?? "Invalid email or password.");
      const lower = msg.toLowerCase();

      if (lower.includes("email")) {
        setError("identifier", { type: "server", message: msg });
      } else if (lower.includes("password")) {
        setError("password", { type: "server", message: msg });
      } else if (lower.includes("incorrect") || lower.includes("invalid")) {
        setError("identifier", { type: "server", message: msg });
        setError("password", { type: "server", message: msg });
      } else {
        setBannerError(msg);
      }

      toast.error(msg);
    }
  };

  const onValidationError = (errs: any) => {
    const first = Object.values(errs)[0] as any;
    const message = first?.message ?? "Please fill all required fields.";
    toast.error(message);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onValidationError)}
        className="space-y-5"
      >
        {bannerError && (
          <div className="flex items-start gap-2 rounded-xl bg-red-500/15 p-3 ring-1 ring-red-500/30">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-200" />
            <p className="text-sm text-red-100">{bannerError}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/90">
            <Mail className="h-4 w-4 opacity-80" />
            <span>Enter Email</span>
          </label>
          <input
            {...register("identifier")}
            aria-invalid={!!errors.identifier}
            placeholder="becamex@example.com"
            className={[
              "block w-full rounded-xl border px-4 py-3 text-white placeholder-white/50 outline-none bg-white/10",
              errors.identifier
                ? "border-red-400/60 focus:border-red-300"
                : "border-white/15 focus:border-white/30",
            ].join(" ")}
          />
          {errors.identifier && (
            <p className="text-sm text-red-200">
              {(errors.identifier as any).message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white/90">
            <Lock className="h-4 w-4 opacity-80" />
            <span>Enter Password</span>
          </label>
          <div className="relative">
            <input
              {...register("password")}
              aria-invalid={!!errors.password}
              type={show ? "text" : "password"}
              className={[
                "block w-full rounded-xl border px-4 py-3 pr-12 text-white placeholder-white/50 outline-none bg-white/10",
                errors.password
                  ? "border-red-400/60 focus:border-red-300"
                  : "border-white/15 focus:border-white/30",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-white/80 hover:bg-white/10"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-200">
              {(errors.password as any).message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-emerald-900 disabled:opacity-60"
        >
          <span>{isSubmitting ? "Signing in..." : "Continue"}</span>
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="text-right text-sm text-white/80">
          <Link
            href="/forgot-password"
            className="underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </>
  );
}
