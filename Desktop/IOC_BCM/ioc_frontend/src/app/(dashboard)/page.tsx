"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Card = { title: string; subtitle: string; href: string };

const cards: Card[] = [
  { title: "Calendar", subtitle: "Coming Soon", href: "#" },
  { title: "Report", subtitle: "", href: "/report" },
  { title: "Analytics", subtitle: "Coming Soon", href: "#" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-extrabold text-white mb-16 drop-shadow-lg"
      >
        EIP Data Platform
      </motion.h1>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ title, subtitle, href }, idx) => (
          <Link key={idx} href={href} className="focus:outline-none">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex h-64 w-64 cursor-pointer select-none flex-col items-center justify-center 
                         rounded-[32px] bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.10)]
                         ring-1 ring-white/20 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label={`${title} – ${subtitle}`}
            >
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm italic text-white/70">{subtitle}</p>

              <motion.span
                aria-hidden
                initial={false}
                whileHover={{ opacity: 1, x: 10 }}
                className="pointer-events-none absolute inset-0 rounded-[32px] 
                           bg-[linear-gradient(115deg,rgba(255,255,255,0.18)_0%,transparent_35%,transparent_65%,rgba(255,255,255,0.08)_100%)]
                           opacity-0 transition-opacity duration-500"
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
