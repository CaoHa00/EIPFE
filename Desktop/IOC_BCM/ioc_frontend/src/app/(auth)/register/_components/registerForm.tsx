"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/context/auth-context";
import { Mail, User, Lock, ArrowRight } from "lucide-react";

const schema = z.object({
  username: z.string().min(2, "Username is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
  phonenumber: z.string().nonempty("Phone number is required"),
  legalrep: z.string().nonempty("Legal representative is required"),
  address: z.string().nonempty("Address is required"),
  facilityname: z.string().nonempty("Facility name is required"),
  activitytype: z.string().nonempty("Activity type is required"),
  operatingfrequency: z.string().nonempty("Operating frequency is required"),
  seasonalperiodnote: z.string().optional(),
  businesslicense: z.string().nonempty("Business license is required"),
  taxcode: z.string().nonempty("Tax code is required"),
  iso: z.string().optional(),
  envpermitnumber: z.string().optional(),
  envpermitissuedate: z.string().optional(),
  envpermitissuer: z.string().optional(),
  permittype: z.string().nonempty("Permit type is required"),
  projectname: z.string().nonempty("Project name is required"),
  permitnumber: z.string().nonempty("Permit number is required"),
  issuedate: z.string().nonempty("Issue date is required"),
  isserorg: z.string().nonempty("Issuer organization is required"),
  permiffile: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const { register: doRegister } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setOk(null);
    try {
      await doRegister(values);
      setOk("Account created. Please log in.");
    } catch (e: any) {
      setError(e?.message ?? "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <User className="h-4 w-4 opacity-80" />
          <span>Username</span>
        </label>
        <input
          className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none"
          placeholder="yourusername"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-200">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Mail className="h-4 w-4 opacity-80" />
          <span>Email</span>
        </label>
        <input
          className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-200">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Lock className="h-4 w-4 opacity-80" />
          <span>Password</span>
        </label>
        <input
          type="password"
          className="block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-200">{errors.password.message}</p>
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
