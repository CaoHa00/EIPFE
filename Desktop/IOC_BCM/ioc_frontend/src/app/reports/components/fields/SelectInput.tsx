// src/components/forms/fields/SelectInput.tsx
"use client";
type Option = { label: string; value: string };
type Props = { label: string; value?: string; onChange: (v: string) => void; options: Option[]; required?: boolean; name?: string; };
export default function SelectInput({ label, value = "", onChange, options, required, name }: Props) {
  return (
    <label className="block">
      <span className="block mb-1 text-sm font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 rounded-lg  border-none outline-none focus:ring-0 bg-gray-100"
      >
        <option value="" disabled>— Chọn —</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
