// app/_components/fullScreenLoader.tsx
"use client";
import React from "react";

export default function FullScreenLoader({
  message = "Redirecting…",
}: {
  message?: string;
}) {
  return (
    <div className="min-h-screen bg-[url(/img/LoginBG.png)] bg-cover flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 border-4 border-t-blue-300 border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin"></div>
        <p className="text-white text-xl font-medium">{message}</p>
      </div>
    </div>
  );
}
