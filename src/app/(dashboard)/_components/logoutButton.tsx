"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/app/context/auth-context";

export default function LogoutButton() {
  const { logout, loading } = useAuth();

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white ring-1 ring-white/20
                 hover:bg-white/15 disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
}
