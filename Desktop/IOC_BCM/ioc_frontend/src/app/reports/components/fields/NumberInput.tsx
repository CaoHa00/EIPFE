// src/components/forms/fields/NumberInput.tsx
"use client";
import { useEffect, useState } from "react";
type Props = {
  label: string;
  value?: number | string;
  onChange: (v: number) => void;
  required?: boolean;
  name?: string;
};
export default function NumberInput({ label, value = "", onChange, required, name }: Props) {
  const isEmptyProp =
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "number" && Number.isNaN(value));

  const [text, setText] = useState<string>(isEmptyProp ? "" : String(value));

  // Keep local text in sync if value prop changes externally
  useEffect(() => {
    const next = isEmptyProp ? "" : String(value);
    if (next !== text) setText(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmptyProp, value]);

  return (
    <label className="block">
      <span className="block mb-1 text-sm font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input
        name={name}
        type="text"
        inputMode="decimal"
        required={required}
        value={text}
        onChange={(e) => {
          const raw = e.target.value;
          setText(raw);

          const trimmed = raw.trim();
          if (trimmed === "") {
            onChange(NaN as unknown as number);
            return;
          }

          // Normalize comma decimals to dot for parsing
          const normalized = trimmed.replace(/,/g, ".");

          // Only propagate when it's a complete valid number
          const completeNumberPattern = /^-?\d+(?:\.\d+)?$/;
          if (completeNumberPattern.test(normalized)) {
            const numeric = Number(normalized);
            if (Number.isFinite(numeric)) {
              onChange(numeric);
            }
          }
        }}
        className="w-full h-11 rounded-lg  border-none   outline-none focus:ring-0 bg-gray-100"
      />
    </label>
  );
}
