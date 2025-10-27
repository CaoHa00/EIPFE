"use client";

export default function ReportHeader() {
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
                {/* Step 1 - Active */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white font-bold">
                    1
                </div>

                {/* Các step còn lại */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        {/* Đường nối */}
                        <div className="w-10 md:w-16 border-t-2 border-gray-400 border-dashed" />
                        {/* Step */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold">
                            {i + 2}
                        </div>
                    </div>
                ))}
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
                <a
                    href="#"
                    className="font-semibold text-red-700 underline hover:text-red-800"
                >
                    Tại Đây
                </a>
            </p>
        </header>
    );
}
