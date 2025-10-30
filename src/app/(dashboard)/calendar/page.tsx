// app/(dashboard)/calendar/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./_components/sidebar";
import CalendarHeader from "./_components/calendarHeader";
import CalendarYearView from "./_components/calendarYearView";
import CalendarMonthView from "./_components/calendarMonthView";

const EVENTS = [
  { title: "Becamex Event", date: "2025-10-18", color: "#ef4444" },
  { title: "Report Order 1", date: "2025-10-18", color: "#22c55e" },
  { title: "Report Order 2", date: "2025-10-18", color: "#8b5cf6" },
  { title: "Kickoff", date: "2025-05-06", color: "#22c55e" },
];

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "year">("month");

  return (
    <div className="flex min-h-[100dvh] bg-gray-50 text-gray-900">
      <Sidebar />

      <div className="flex-1 p-6">
        <CalendarHeader view={view} setView={setView} />
        <div className="relative mt-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {view === "year" ? (
              <motion.div
                key="year"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <CalendarYearView year={2025} events={EVENTS} />
              </motion.div>
            ) : (
              <motion.div
                key="month"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35 }}
              >
                {/* FullCalendar wants 'start' property; we can map quickly */}
                <CalendarMonthView
                  events={EVENTS.map((e) => ({
                    title: e.title,
                    start: e.date,
                    color: tint(e.color, 0.15), // soft bg
                    borderColor: e.color,
                    textColor: e.color,
                  }))}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// tiny helper to create soft bg from a solid color (fallback if you prefer plain)
function tint(hex: string, alpha = 0.1) {
  // converts "#RRGGBB" to rgba with alpha
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
