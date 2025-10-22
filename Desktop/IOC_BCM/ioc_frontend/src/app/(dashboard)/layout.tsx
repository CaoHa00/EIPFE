"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import UserMenu from "./_components/userMenu";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showGlobalHeader = !pathname.startsWith("/calendar");
  //bg-[radial-gradient(circle_at_25%_25%,#0e7c66_0%,#0b5b4f_100%)]
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[url(/img/UIBG.png)] bg-cover text-white">
      {/* floating particles (remain global) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 h-[420px] w-[420px] rounded-full bg-emerald-400/12 blur-3xl"
          animate={{ x: [0, 50, -40, 0], y: [0, -30, 20, 0] }}
          transition={{ repeat: Infinity, duration: 22 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 h-[320px] w-[320px] rounded-full bg-teal-500/12 blur-3xl"
          animate={{ x: [0, -40, 30, 0], y: [0, 25, -25, 0] }}
          transition={{ repeat: Infinity, duration: 26 }}
        />
      </div>

      {showGlobalHeader && (
        <header className="flex items-center justify-between px-10 py-6 backdrop">
          <Image
            src="/icon/BecamexLogo.svg"
            alt="Becamex"
            width={200}
            height={200}
            priority
          />
          <UserMenu />
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
