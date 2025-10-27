// src/components/forms/fields/FileUpload.tsx
"use client";
type Props = {
  label: string;
  file?: File | null;
  onChange: (f: File | null) => void;
  note?: string;
  accept?: string;
  maxMB?: number;
};
export default function FileUpload({ label, file, onChange, note, accept, maxMB = 2 }: Props) {
  return (
    <div className="block">
      <span className="block mb-1 text-sm font-medium">{label}</span>
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          if (f && f.size > maxMB * 1024 * 1024) {
            alert(`File vượt quá ${maxMB}MB`);
            onChange(null);
          } else {
            onChange(f);
          }
        }}
        className="w-full"
      />
      <div className="mt-1 text-xs text-gray-500">{note || `Dung lượng ≤ ${maxMB}MB`}</div>
      {file && <div className="mt-2 text-sm">Đã chọn: <b>{file.name}</b></div>}
    </div>
  );
}
