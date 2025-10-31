"use client";
type Props = {
  label: string;
  value?: string; // expected format: YYYY-MM-DD
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  name?: string;
  min?: string; // YYYY-MM-DD
  max?: string; // YYYY-MM-DD
};

export default function DateInput({ label, value = "", onChange, required, name, error, min, max }: Props) {
  return (
    <label className="block">
      <span className="block mb-1 text-sm font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input
        type="date"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full h-11 rounded-lg border-none outline-none focus:ring-0 bg-gray-100 ${error ? "ring-1 ring-red-500" : ""}`}
        min={min}
        max={max}
      />
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </label>
  );
}

