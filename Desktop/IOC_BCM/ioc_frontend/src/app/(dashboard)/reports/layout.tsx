"use client";

import "@/app/globals.css";
import ReportHeader from "./components/Header";
import { usePathname } from "next/navigation";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeader = pathname.includes("report5A");
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[10%_80%_10%]">
      {/* Cột trái có ảnh nền */}
      <div
        className="hidden lg:block"
        style={{
          backgroundImage: "url(/img/UIBG.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Cột giữa chứa nội dung */}
      <div className="flex flex-col bg-white min-h-screen shadow-xl">
        {showHeader && <ReportHeader />}
        <main className="flex-1 overflow-y-auto px-6 md:px-16 py-10">
          {children}
        </main>
      </div>

      {/* Cột phải có ảnh nền */}
      <div
        className="hidden lg:block"
        style={{
          backgroundImage: "url(/img/UIBG.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
