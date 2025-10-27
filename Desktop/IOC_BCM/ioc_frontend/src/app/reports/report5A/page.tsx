"use client";

import { useEffect, useState } from "react";
import FormSection from "../components/forms/FormSection";
import FormField from "../components/forms/FormField";
import { loadDraft, saveDraft, clearDraft } from "../lib/autosave";

// ---- State shape cho trang này
type Report5A = {
  facilityName: string;
  address: string;
  phone?: string;
  representative: string;

  industry: string;
  capacity: string| number | null;      // number | null để xoá được
  frequency?: string;


  businessregistrationcertificate?: string | null;
  taxnumber?: string | null;

  envPermit?: File | null;
  iso14001?: File | null;

  productQty: string;           // mô tả + đơn vị
  utilities: string;            // nhiên liệu/điện/nước...
};

const EMPTY: Report5A = {
  facilityName: "",
  address: "",
  phone: "",
  representative: "",

  industry: "",
  capacity: null,
  frequency: "",
  businessregistrationcertificate: "",
  taxnumber: "",

  envPermit: null,
  iso14001: null,

  productQty: "",
  utilities: "",
};

export default function Report5APage() {
  const [form, setForm] = useState<Report5A>(EMPTY);

  useEffect(() => {
    const d = loadDraft<Report5A>("report5A_v1");
    if (d) setForm(d);
  }, []);

  // Autosave debounce 400ms
  useEffect(() => {
    const id = setTimeout(() => saveDraft(form, "report5A_v1"), 400);
    return () => clearTimeout(id);
  }, [form]);

  const resetDraft = () => {
    clearDraft("report5A_v1");
    setForm(EMPTY);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <FormSection
        title="Hồ sơ công tác bảo vệ môi trường – Report 5A"
      // desc="Lưu ý: file JPG/PDF ≤ 2MB. Các trường * là bắt buộc."
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Tên Cơ Sở *"
              required
              placeholder="Nhập tên cơ sở (VD: Công ty TNHH ABC)"
              value={form.facilityName}
              onChange={(v) => setForm(f => ({ ...f, facilityName: v }))}
            />
          </div>

          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Địa chỉ *"
              required
              placeholder="Nhập địa chỉ (VD: Số 123, Đường A, TP. Thủ Dầu Một)"
              value={form.address}
              onChange={(v) => setForm(f => ({ ...f, address: v }))}
            />
          </div>

          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Số Điện Thoại *"
              required
              placeholder="Nhập số điện thoại (VD: 0909xxxxxx)"
              value={form.phone ?? ""}
              onChange={(v) => setForm(f => ({ ...f, phone: v }))}
            />
          </div>

          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Người Đại Diện *"
              required
              placeholder="Nhập họ tên người đại diện (VD: Nguyễn Văn A)"
              value={form.representative}
              onChange={(v) => setForm(f => ({ ...f, representative: v }))}
            />
          </div>

          {/* Hàng 2 */}
          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Loại Hình Sản Xuất/Kinh Doanh *"
              required
              placeholder="VD: Sản xuất nước giải khát / Gia công cơ khí..."
              value={form.industry}
              onChange={(v) => setForm(f => ({ ...f, industry: v }))}
            />
          </div>

          <div className="md:col-span-1">
            <FormField
              kind="number"
              label="Quy Mô / Công Suất *"
              required
              value={form.capacity?? undefined} 
              onChange={(v) => setForm(f => ({ ...f, capacity: v }))}
            />
          </div>

          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Tần Suất Hoạt Động *"
              required
              placeholder="VD: 8h/ngày, 5 ngày/tuần"
              value={form.frequency ?? ""}
              onChange={(v) => setForm(f => ({ ...f, frequency: v }))}
            />
          </div>

          <div className="md:col-span-1">
            <div className="h-0 md:h-full" />
          </div>

          {/* Hàng 3: giấy tờ */}
          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Giấy ĐK Kinh Doanh *"
              required
              placeholder="VD..."
              value={form.businessregistrationcertificate ?? ""}
              onChange={(v) => setForm(f => ({ ...f, businessregistrationcertificate: v }))}
            />
          </div>
          <div className="md:col-span-1">
            <FormField
              kind="text"
              label="Mã Số Thuế *"
              required
              placeholder="21132...."
              value={form.taxnumber ?? ""}
              onChange={(v) => setForm(f => ({ ...f, taxnumber: v }))}
            />
          </div>
          <div className="md:col-span-1">
            <FormField
              kind="file"
              label="Giấy Phép Môi Trường"
              file={form.envPermit ?? null}
              accept=".pdf,.jpg,.jpeg,.png"
              note="PDF/JPG/PNG ≤ 2MB"
              onChange={(f) => setForm(d => ({ ...d, envPermit: f }))}
            />
          </div>

          <div className="md:col-span-1">
            <FormField
              kind="file"
              label="Giấy Chứng Nhận ISO 14001"
              file={form.iso14001 ?? null}
              accept=".pdf,.jpg,.jpeg,.png"
              note="Nếu có"
              onChange={(f) => setForm(d => ({ ...d, iso14001: f }))}
            />
          </div>


          {/* Hàng 4 */}
          <div className="md:col-span-2">
            <FormField
              kind="text"
              label="Khối Lượng Sản Phẩm Của Năm Báo Cáo Và Năm Gần Nhất *"
              required
              placeholder="VD: Năm 2024: 100 tấn; Năm 2025: 120 tấn"
              value={form.productQty}
              onChange={(v) => setForm(f => ({ ...f, productQty: v }))}
            />
          </div>

          <div className="md:col-span-2">
            <FormField
              kind="text"
              label="Nhiên Liệu, Điện, Nước Tiêu Thụ Của Năm Báo Cáo Và Năm Gần Nhất *"
              required
              placeholder="VD: Điện: 120.000 kWh; Nước: 5.000 m³; Dầu: 2.000 lít"
              value={form.utilities}
              onChange={(v) => setForm(f => ({ ...f, utilities: v }))}
            />
          </div>
        </div>

        {/* Action */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="px-4 h-10 rounded-lg border bg-white"
            onClick={() => saveDraft(form, "report5A_v1")}
          >
            Lưu nháp
          </button>
          <button
            type="button"
            className="px-4 h-10 rounded-lg border bg-white"
            onClick={resetDraft}
          >
            Xoá nháp
          </button>
          <button
            type="button"
            className="ml-auto px-4 h-10 rounded-lg bg-blue-600 text-white"
            onClick={() => alert("Submit mock – cắm API POST /api/reports/report5a")}
          >
            Next
          </button>
        </div>
      </FormSection >
    </div >
  );
}
