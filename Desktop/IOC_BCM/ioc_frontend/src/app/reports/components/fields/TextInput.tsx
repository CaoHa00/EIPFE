"use client";
type Props = {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  name?: string;
};
export default function TextInput({ label, value = "", onChange, required, placeholder, name }: Props) {
  return (
    <label className="block">
      <span className="block mb-1 text-sm font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 rounded-lg border-none outline-none focus:ring-0 bg-gray-100"
      />
    </label>
  );
}
