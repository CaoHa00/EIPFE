"use client";

import { useState } from "react";
import { ChevronDown, Settings, Headphones, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-64 border-r border-gray-200 bg-white px-6 py-6 flex flex-col justify-between">
      <div>
        <Image
          src="/icon/BecamexLogo_alt.svg"
          alt="Becamex alt"
          className="mb-6 w-40"
          width={200}
          height={200}
        />
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-xl bg-emerald-700 px-4 py-3 text-white font-medium hover:bg-emerald-800 transition"
        >
          + Create
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold uppercase text-gray-500">
            Filter
          </p>
          {["Event", "Report 1", "Report 2", "Report 3"].map((label, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                defaultChecked
                className="accent-emerald-600"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700 ring-1 ring-amber-200">
          <AlertTriangle className="h-4 w-4" />
          You have 3 tasks today
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2 hover:text-emerald-700 cursor-pointer">
            <Settings className="h-4 w-4" /> Settings
          </div>
          <div className="flex items-center gap-2 hover:text-emerald-700 cursor-pointer">
            <Headphones className="h-4 w-4" /> Support
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-emerald-700">Calendar</h2>
      </div>
    </aside>
  );
}
