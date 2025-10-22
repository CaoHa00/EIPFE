"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// (keep your CSS/CDN setup as-is)

type FCEvent = {
  title: string;
  start: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
};

export default function CalendarMonthView({
  events = DEFAULT_EVENTS,
}: {
  events?: FCEvent[];
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* ✅ style “today” as a circle with dark-green bg + white text */}
      <style jsx global>{`
        /* remove FullCalendar's default yellow bg for today */
        .fc .fc-daygrid-day.fc-day-today {
          background: transparent !important;
        }
        /* turn the day number into a pill */
        .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
          background-color: #0e7c66; /* dark emerald */
          color: #ffffff;
          border-radius: 9999px;
          padding: 2px 8px;
          line-height: 1.25;
        }
      `}</style>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        height="auto"
        dayHeaderFormat={{ weekday: "short" }}
        events={events}
        dayMaxEventRows={3}
      />
    </div>
  );
}

const DEFAULT_EVENTS: FCEvent[] = [
  {
    title: "Becamex Event",
    start: "2025-10-18",
    color: "#fee2e2",
    textColor: "#dc2626",
    borderColor: "#ef4444",
  },
  {
    title: "Report Order 1",
    start: "2025-10-18",
    color: "#dcfce7",
    textColor: "#16a34a",
    borderColor: "#22c55e",
  },
  {
    title: "Report Order 2",
    start: "2025-10-18",
    color: "#ede9fe",
    textColor: "#7c3aed",
    borderColor: "#8b5cf6",
  },
];
