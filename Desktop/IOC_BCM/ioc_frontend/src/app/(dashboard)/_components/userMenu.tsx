"use client";

import { useState } from "react";
import { Building2, ChevronDown, LogOut, User2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleBusinessDetails = () => {
    setOpen(false);
    router.push("/business-details");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm font-medium hover:bg-white/20 transition"
      >
        <User2 className="h-4 w-4" />
        <span>{user?.fullname ?? "User"}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-xl bg-white/10 p-2 shadow-lg ring-1 ring-white/20 backdrop-blur-lg z-50"
          >
            <button
              onClick={handleBusinessDetails}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-white/15"
            >
              <Building2 className="h-4 w-4" />
              <span>Business Details</span>
            </button>
            <button
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-white/15"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
