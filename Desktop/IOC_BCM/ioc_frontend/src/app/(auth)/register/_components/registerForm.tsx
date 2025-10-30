"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/context/auth-context";
import { Mail, User, Lock, ArrowRight, Phone, EyeOff, Eye } from "lucide-react";
import axios from "axios";

// const schema = z
//   .object({
//     fullname: z.string().min(2, "Full name is too short"),
//     email: z.string().email("Invalid email"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters long")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/\d/, "Password must contain at least one number")
//       .regex(
//         /[^A-Za-z0-9]/,
//         "Password must contain at least one special character"
//       )
//       .refine((val) => !val.includes(" "), "Password cannot contain spaces"),

//     confirmPassword: z.string(),
//     phonenumber: z.string().nonempty("Phone number is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });
// type FormValues = z.infer<typeof schema>;

const passwordRequirements = {
  minLength: 8,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /\d/,
  special: /[^A-Za-z0-9]/,
  noSpaces: /^\S*$/,
};

export const schema = z
  .object({
    fullname: z
      .string()
      .min(2, "Full name is too short")
      .transform((s) => s.trim()),
    email: z
      .string()
      .email("Invalid email")
      .transform((s) => s.trim()),
    phonenumber: z
      .string()
      .nonempty("Phone number is required")
      .transform((s) => s.trim()),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const pwd = data.password ?? "";

    // Collect multiple issues so user sees every missing rule
    if (pwd.length < passwordRequirements.minLength) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: `Password must be at least ${passwordRequirements.minLength} characters`,
      });
    }
    if (!passwordRequirements.lowercase.test(pwd)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must contain at least one lowercase letter",
      });
    }
    if (!passwordRequirements.uppercase.test(pwd)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must contain at least one uppercase letter",
      });
    }
    if (!passwordRequirements.digit.test(pwd)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must contain at least one number",
      });
    }
    if (!passwordRequirements.special.test(pwd)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password must contain at least one special character",
      });
    }
    if (!passwordRequirements.noSpaces.test(pwd)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password cannot contain spaces",
      });
    }

    // Confirm password match -> show error on confirmPassword field
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const { register: doRegister } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);
  const [show, setShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError: setFieldError,
    clearErrors,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const watchedPassword = watch("password");
  const watchedConfirm = watch("confirmPassword");

  React.useEffect(() => {
    // When password changes, re-validate confirmPassword so resolver can add/remove the error.
    // Only trigger if the user already typed something in confirm, to avoid noisy validation.
    if (typeof watchedConfirm !== "undefined" && watchedConfirm !== "") {
      // trigger returns a Promise<boolean>, we don't need to await here
      trigger("confirmPassword");
    }
  }, [watchedPassword, watchedConfirm, trigger]);

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setOk(null);
    try {
      await doRegister(values);
      setOk("Account created. Please log in.");
    } catch (err: any) {
      // axios structured error handling
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        // if backend returned field errors in `result`
        const fieldErrors = data?.result as
          | Array<{ field: string; message: string }>
          | undefined;
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach((fe) => {
            // map backend field names to form names if necessary
            // example: backend phoneNumber -> phonenumber form key
            const formKey =
              fe.field === "phoneNumber"
                ? "phonenumber"
                : fe.field === "fullName"
                ? "fullname"
                : fe.field;
            setFieldError(formKey as any, {
              type: "server",
              message: fe.message,
            });
          });
          return;
        }
        // fallback to global error message
        setError(data?.message ?? err.message ?? "Registration failed");
      } else {
        setError(err?.message ?? "Registration failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <User className="h-4 w-4 opacity-80" />
          <span>Full Name</span>
        </label>
        <input
          className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none"
          placeholder="Your Full Name"
          {...register("fullname")}
        />
        {errors.fullname && (
          <p className="text-sm text-red-200">{errors.fullname.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Mail className="h-4 w-4 opacity-80" />
          <span>Email</span>
        </label>
        <input
          className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none"
          placeholder="becamex@example.com"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-red-200">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Phone className="h-4 w-4 opacity-80" />
          <span>Phone Number</span>
        </label>
        <input
          className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none"
          placeholder="Your Phone Number"
          {...register("phonenumber")}
        />
        {errors.phonenumber && (
          <p className="text-sm text-red-200">{errors.phonenumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Lock className="h-4 w-4 opacity-80" />
          <span>Password</span>
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/50 outline-none"
            placeholder="Your Password"
            {...register("password")}
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
          <p className="text-sm text-red-200">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Lock className="h-4 w-4 opacity-80" />
          <span>Confirm Password</span>
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/50 outline-none"
            placeholder="Confirm Your Password"
            {...register("confirmPassword")}
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
        {errors.confirmPassword && (
          <p className="text-sm text-red-200">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-200">{error}</p>}
      {ok && <p className="text-sm text-emerald-200">{ok}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-emerald-900"
      >
        <span>Create Account</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </form>
  );
}
