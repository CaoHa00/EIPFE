"use client";
import { useSearchParams } from "next/navigation";

export default function ReportHeader() {
  const searchParams = useSearchParams();
  const raw = Number(searchParams.get("step") ?? "0");
  const active = Number.isFinite(raw) ? Math.max(0, Math.min(4, raw)) : 0; // 0..4

  return (
    <header className="bg-white py-10 text-center border-b border-gray-200">
      {/* Tiêu đề chính */}
      <h1 className="text-7xl font-extrabold text-green-900 tracking-tight">
        EIP Data Platform
      </h1>

      {/* Phụ đề */}
      <p className="text-lg text-gray-700 mt-2 font-semibold">
        Quy Trình Báo cáo công tác bảo vệ môi trường
      </p>

      {/* Thanh tiến trình */}
      <div className="flex justify-center items-center mt-8 gap-4 md:gap-6">
        {Array.from({ length: 5 }).map((_, i) => {
          const state = i < active ? "done" : i === active ? "active" : "todo";
          const cls =
            state === "active"
              ? "bg-green-700 text-white"
              : state === "done"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700";
          return (
            <div key={i} className="flex items-center gap-4">
              {i > 0 && (
                <div className="w-10 md:w-16 border-t-2 border-gray-400 border-dashed" />
              )}
              <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${cls}`}>
                {i + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dòng mô tả */}
      <div className="mt-8">
        <p className="text-xl font-semibold text-gray-800">
          Hồ Sơ Công tác bảo vệ môi trường năm 2025
        </p>
      </div>

      {/* Ghi chú */}
      <p className="mt-4 text-sm text-red-600">
        Lưu ý: Tải ảnh và file báo cáo (Kiểu Ảnh .JPG, Kích Thước {"<"} 2MB),
        vui lòng xem hướng dẫn quy Chuẩn File và Thủ Tục{" "}
        <a href="#" className="font-semibold text-red-700 underline hover:text-red-800">
          Tại Đây
        </a>
      </p>
    </header>
  );
}
