"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameYear,
  startOfMonth,
} from "date-fns";

type MiniEvent = { title: string; date: string; color?: string };

export default function CalendarYearView({
  year = new Date().getFullYear(),
  events = [],
}: {
  year?: number;
  events?: MiniEvent[];
}) {
  // normalize events -> Map("yyyy-MM-dd" => MiniEvent[])
  const eventsByDate = new Map<string, MiniEvent[]>();
  const sameYearEvents = events.filter((e) =>
    isSameYear(new Date(e.date), new Date(year, 0, 1))
  );
  for (const ev of sameYearEvents) {
    const key = format(new Date(ev.date), "yyyy-MM-dd");
    const arr = eventsByDate.get(key) ?? [];
    arr.push(ev);
    eventsByDate.set(key, arr);
  }

  const base = new Date(year, 0, 1);
  const months = Array.from({ length: 12 }, (_, i) => addMonths(base, i));

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {months.map((monthDate, idx) => (
        <MiniMonth
          key={idx}
          monthDate={monthDate}
          eventsByDate={eventsByDate}
        />
      ))}
    </div>
  );
}

function MiniMonth({
  monthDate,
  eventsByDate,
}: {
  monthDate: Date;
  eventsByDate: Map<string, MiniEvent[]>;
}) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const days = eachDayOfInterval({ start, end });
  const pad = Array.from({ length: getDay(start) }, () => null);
  const today = new Date();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition">
      <h3 className="mb-3 text-base font-semibold text-gray-700">
        {format(monthDate, "MMMM yyyy")}
      </h3>

      <div className="grid grid-cols-7 text-xs text-gray-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1 text-sm text-gray-800">
        {pad.map((_, i) => (
          <div key={`p-${i}`} className="aspect-square" />
        ))}

        {days.map((d) => {
          const key = format(d, "yyyy-MM-dd");
          const dayEvents = eventsByDate.get(key) ?? [];
          const isToday = isSameDay(d, today);

          return (
            <div
              key={key}
              className="aspect-square rounded-md cursor-pointer transition grid grid-rows-[auto_1fr] p-1"
              title={
                dayEvents.length
                  ? dayEvents.map((e) => e.title).join(" • ")
                  : undefined
              }
            >
              {/* Day number (circle when today) */}
              <div className="grid place-items-center">
                <span
                  className={`inline-block px-2 py-[2px] leading-none ${
                    isToday
                      ? "rounded-full bg-[#0e7c66] text-white"
                      : "rounded-full hover:bg-emerald-100"
                  }`}
                >
                  {format(d, "d")}
                </span>
              </div>

              {/* Event dots */}
              <div className="mt-1 flex flex-wrap items-start gap-[3px]">
                {dayEvents.slice(0, 4).map((e, i) => (
                  <span
                    key={i}
                    className="h-[6px] w-[6px] rounded-full"
                    style={{ backgroundColor: e.color || "#10b981" }} // default emerald
                  />
                ))}
                {dayEvents.length > 4 && (
                  <span className="ml-1 text-[10px] text-gray-500">
                    +{dayEvents.length - 4}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
