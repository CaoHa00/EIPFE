"use client";

import { useFormContext, useFormState } from "react-hook-form";
import FormSection from "../../components/forms/FormSection";
import FormField from "../../components/forms/FormField";
import type { Report5AForm } from "../schemas/AllSchema";
import type { Step2 as Step2Type } from "../schemas/Step2Schema";

export default function Step2() {
  const { watch, setValue, control } = useFormContext<Report5AForm>();
  const { errors } = useFormState({ control });

  const v = watch("step2");
  type Step2Key = keyof Step2Type;
  const err = (path: Step2Key) => (errors as any)?.step2?.[path]?.message as string | undefined;

  const setNum = (path: `step2.${string}`, val: number) =>
    setValue(path as any, Number.isNaN(val) ? null : val, { shouldDirty: true, shouldValidate: true });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <FormSection title="Bước 2 - Nước thải và xử lý">
        {/* Ghi chú tổng quan */}
        <FormField
          kind="textarea"
          label="Các công trình xử lý nước thải và thay đổi so với kỳ trước"
          value={v?.congTrinhXuLyNuocThai ?? ""}
          onChange={(val) => setValue("step2.congTrinhXuLyNuocThai", val, { shouldDirty: true, shouldValidate: true })}
          error={err("congTrinhXuLyNuocThai")}
          rows={4}
        />

        {/* Nước thải sinh hoạt */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Nước thải sinh hoạt</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              kind="number"
              label="Lưu lượng phát sinh – Năm báo cáo (m³)"
              required
              value={v?.sinhHoat_baoCao ?? ""}
              onChange={(val) => setNum("step2.sinhHoat_baoCao", val)}
              error={err("sinhHoat_baoCao")}
            />
            <FormField
              kind="number"
              label="Lưu lượng phát sinh – Năm gần nhất (m³)"
              value={v?.sinhHoat_ganNhat ?? ""}
              onChange={(val) => setNum("step2.sinhHoat_ganNhat", val)}
              error={err("sinhHoat_ganNhat")}
            />
            <FormField
              kind="number"
              label="Tổng lưu lượng theo thiết kế (m³)"
              required
              value={v?.sinhHoat_thietKe ?? ""}
              onChange={(val) => setNum("step2.sinhHoat_thietKe", val)}
              error={err("sinhHoat_thietKe")}
            />
          </div>
        </div>

        {/* Nước thải công nghiệp */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Nước thải công nghiệp</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              kind="number"
              label="Lưu lượng phát sinh – Năm báo cáo (m³)"
              value={v?.congNghiep_baoCao ?? ""}
              onChange={(val) => setNum("step2.congNghiep_baoCao", val)}
              error={err("congNghiep_baoCao")}
            />
            <FormField
              kind="number"
              label="Lưu lượng phát sinh – Năm gần nhất (m³)"
              value={v?.congNghiep_ganNhat ?? ""}
              onChange={(val) => setNum("step2.congNghiep_ganNhat", val)}
              error={err("congNghiep_ganNhat")}
            />
            <FormField
              kind="number"
              label="Tổng lưu lượng theo thiết kế (m³)"
              value={v?.congNghiep_thietKe ?? ""}
              onChange={(val) => setNum("step2.congNghiep_thietKe", val)}
              error={err("congNghiep_thietKe")}
            />
          </div>
        </div>

        {/* Nước làm mát */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Nước làm mát</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              kind="number"
              label="Lưu lượng phát sinh – Năm báo cáo (m³)"
              value={v?.lamMat_baoCao ?? ""}
              onChange={(val) => setNum("step2.lamMat_baoCao", val)}
              error={err("lamMat_baoCao")}
            />
            <FormField
              kind="number"
              label="Lưu lượng phát sinh – Năm gần nhất (m³)"
              value={v?.lamMat_ganNhat ?? ""}
              onChange={(val) => setNum("step2.lamMat_ganNhat", val)}
              error={err("lamMat_ganNhat")}
            />
            <FormField
              kind="number"
              label="Tổng lưu lượng theo thiết kế (m³)"
              value={v?.lamMat_thietKe ?? ""}
              onChange={(val) => setNum("step2.lamMat_thietKe", val)}
              error={err("lamMat_thietKe")}
            />
          </div>
        </div>

        {/* Tình hình đấu nối */}
        <div className="mt-6">
          <FormField
            kind="textarea"
            label="Tình hình đấu nối hệ thống XLNT tập trung"
            value={v?.tinhHinhDauNoiXLNT ?? ""}
            onChange={(val) => setValue("step2.tinhHinhDauNoiXLNT", val, { shouldDirty: true, shouldValidate: true })}
            error={err("tinhHinhDauNoiXLNT")}
            rows={4}
          />
        </div>
      </FormSection>
    </div>
  );
}

