"use client";
type Props = {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  name?: string;
  rows?: number;
};
export default function Textarea({ label, value = "", onChange, required, placeholder, name, error, rows = 4 }: Props) {
  return (
    <label className="block">
      <span className="block mb-1 text-sm font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        className={`w-full rounded-lg border-none outline-none focus:ring-0 bg-gray-100 p-3 ${error ? "ring-1 ring-red-500" : ""}`}
      />
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </label>
  );
}

