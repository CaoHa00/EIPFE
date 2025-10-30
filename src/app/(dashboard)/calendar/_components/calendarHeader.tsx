"use client";

import {
  CalendarDays,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UserMenu from "@/app/(dashboard)/_components/userMenu";

interface Props {
  view: "month" | "year";
  setView: (v: "month" | "year") => void;
}

export default function CalendarHeader({ view, setView }: Props) {
  return (
    <div className="flex items-center justify-between">
      {/* Left controls */}
      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 transition">
          Today
        </button>
        <button className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-lg font-semibold">October 2025</p>
        <button className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Right: View toggle + user menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setView("month")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${
            view === "month"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <CalendarIcon className="mr-2 inline h-4 w-4" />
          Month
        </button>
        <button
          onClick={() => setView("year")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${
            view === "year"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <CalendarDays className="mr-2 inline h-4 w-4" />
          Year
        </button>

        <div className="ml-2">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
