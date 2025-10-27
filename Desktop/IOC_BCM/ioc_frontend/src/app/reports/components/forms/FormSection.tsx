// src/components/forms/FormSection.tsx
"use client";
import { ReactNode } from "react";

export default function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8  border-none bg-white w-full">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
