"use client";

import { useFormContext, useFormState } from "react-hook-form";
import FormSection from "../../components/forms/FormSection";
import FormField from "../../components/forms/FormField";
import GroupRepeater from "../../components/forms/GroupRepeater";
import type { Report5AForm } from "../schemas/AllSchema";
import type { Step1 as Step1Type } from "../schemas/Step1Schema";

export default function Step1() {
  const { watch, setValue, control } = useFormContext<Report5AForm>();
  const { errors } = useFormState({ control });

  const v = watch("step1");
  type Step1Key = keyof Step1Type;
  const err = (path: Step1Key) => (errors as any)?.step1?.[path]?.message as string | undefined;
  const setNum = (path: `step1.${string}`, num: number) =>
    setValue(path as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true });

  const freqOptions = ["Thường xuyên", "Theo mùa"].map((s) => ({ label: s, value: s }));
  const permitTypeOptions = [
    { label: "Xử lý nước thải", value: "xlnuoc" },
    { label: "Khí thải", value: "khithai" },
    { label: "Chất thải rắn", value: "ctran" },
    { label: "Khác", value: "khac" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <FormSection title="Thông tin cơ sở">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField kind="text" label="Tên cơ sở sản xuất/kinh doanh/dịch vụ" required value={v?.facility_name ?? ""}
            onChange={(val) => setValue("step1.facility_name", val, { shouldDirty: true, shouldValidate: true })}
            error={err("facility_name")} />
          <div className="md:col-span-2">
            <FormField kind="text" label="Địa chỉ" required value={v?.address ?? ""}
              onChange={(val) => setValue("step1.address", val, { shouldDirty: true, shouldValidate: true })}
              error={err("address")} rows={3} />
          </div>
          <FormField kind="text" label="Số điện thoại" required value={v?.phone_number ?? ""}
            onChange={(val) => setValue("step1.phone_number", val, { shouldDirty: true, shouldValidate: true })}
            error={err("phone_number")} />
          <FormField kind="text" label="Người đại diện" required value={v?.legal_representative ?? ""}
            onChange={(val) => setValue("step1.legal_representative", val, { shouldDirty: true, shouldValidate: true })}
            error={err("legal_representative")} />
        </div>
      </FormSection>

      <FormSection title="Hoạt động">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField kind="textarea" label="Loại hình hoạt động" required value={v?.activity_type ?? ""}
            onChange={(val) => setValue("step1.activity_type", val, { shouldDirty: true, shouldValidate: true })}
            error={err("activity_type")} rows={3} />
          <FormField kind="textarea" label="Quy mô/Công suất" required value={v?.scale_capacity ?? ""}
            onChange={(val) => setValue("step1.scale_capacity", val, { shouldDirty: true, shouldValidate: true })}
            error={err("scale_capacity")} rows={3} />
        </div>
      </FormSection>

      <FormSection title="Tần suất hoạt động">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField kind="select" label="Tần suất" required value={v?.operating_frequency ?? ""}
            onChange={(val) => setValue("step1.operating_frequency", val, { shouldDirty: true, shouldValidate: true })}
            options={freqOptions} error={err("operating_frequency")} />
          {v?.operating_frequency === "Theo mùa" && (
            <div className="md:col-span-2">
              <FormField kind="text" label="Thời gian hoạt động (nếu theo mùa)" value={v?.seasonal_period_note ?? ""}
                onChange={(val) => setValue("step1.seasonal_period_note", val, { shouldDirty: true, shouldValidate: true })}
                error={err("seasonal_period_note")} />
            </div>
          )}
        </div>
      </FormSection>

      <FormSection title="Pháp lý doanh nghiệp">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField kind="text" label="Số Giấy đăng ký kinh doanh" required value={v?.business_license_number ?? ""}
            onChange={(val) => setValue("step1.business_license_number", val, { shouldDirty: true, shouldValidate: true })}
            error={err("business_license_number")} />
          <FormField kind="text" label="Mã số thuế" required value={v?.tax_code ?? ""}
            onChange={(val) => setValue("step1.tax_code", val, { shouldDirty: true, shouldValidate: true })}
            error={err("tax_code")} />
        </div>
      </FormSection>

      <FormSection title="Giấy phép môi trường (nếu có)">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField kind="text" label="GPMT số" value={v?.env_permit_number ?? ""}
            onChange={(val) => setValue("step1.env_permit_number", val, { shouldDirty: true, shouldValidate: true })}
            error={err("env_permit_number")} />
          <FormField kind="date" label="Ngày cấp (GPMT)" value={v?.env_permit_issue_date ?? ""}
            onChange={(val) => setValue("step1.env_permit_issue_date", val, { shouldDirty: true, shouldValidate: true })}
            error={err("env_permit_issue_date")} />
          <FormField kind="text" label="Cơ quan cấp (GPMT)" value={v?.env_permit_issuer ?? ""}
            onChange={(val) => setValue("step1.env_permit_issuer", val, { shouldDirty: true, shouldValidate: true })}
            error={err("env_permit_issuer")} />
          <FormField kind="file" label="File đính kèm (GPMT)" file={v?.env_permit_file ?? null}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(file) => setValue("step1.env_permit_file", file ?? null, { shouldDirty: true, shouldValidate: true })}
          />
        </div>
      </FormSection>

      <FormSection title="Giấy phép môi trường thành phần">
        <GroupRepeater
          name="step1.component_permits"
          title="Giấy phép thành phần"
          defaultItem={{ permit_type: "", project_name: "", permit_number: "", issue_date: "", issuer_org: "", permit_file: null as any }}
          renderItem={(base, i, remove) => {
            const item = watch(base as any) as any;
            const e = (k: keyof typeof item) => (errors as any)?.step1?.component_permits?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField kind="select" label="Loại giấy phép" value={item?.permit_type ?? ""}
                  onChange={(val) => setValue(`${base}.permit_type` as any, val, { shouldDirty: true, shouldValidate: true })}
                  options={permitTypeOptions} error={e("permit_type")} />
                <FormField kind="text" label="Tên dự án/Công trình/Nội dung" value={item?.project_name ?? ""}
                  onChange={(val) => setValue(`${base}.project_name` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={e("project_name")} />
                <FormField kind="text" label="Số quyết định/Giấy phép/Sổ" value={item?.permit_number ?? ""}
                  onChange={(val) => setValue(`${base}.permit_number` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={e("permit_number")} />
                <FormField kind="date" label="Ngày cấp" value={item?.issue_date ?? ""}
                  onChange={(val) => setValue(`${base}.issue_date` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={e("issue_date")} />
                <FormField kind="text" label="Cơ quan cấp" value={item?.issuer_org ?? ""}
                  onChange={(val) => setValue(`${base}.issuer_org` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={e("issuer_org")} />
                <FormField kind="file" label="File đính kèm (nếu có)" file={item?.permit_file ?? null}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(file) => setValue(`${base}.permit_file` as any, file ?? null, { shouldDirty: true, shouldValidate: true })}
                />
                <div className="md:col-span-3 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

      <FormSection title="Chứng nhận ISO 14001 (nếu có)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField kind="file" label="" file={v?.iso_14001_certificate ?? null}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(file) => setValue("step1.iso_14001_certificate" as any, file ?? null, { shouldDirty: true, shouldValidate: true })}
          />
        </div>
      </FormSection>

      <FormSection title="Sản lượng sản phẩm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField kind="number" label="Khối lượng (năm báo cáo)" value={v?.product_volume_cy ?? ""}
            onChange={(num) => setNum("step1.product_volume_cy", num)} error={err("product_volume_cy")} />
          <FormField kind="select" label="Đơn vị (năm báo cáo)" value={v?.product_unit_cy ?? ""}
            onChange={(val) => setValue("step1.product_unit_cy" as any, val, { shouldDirty: true, shouldValidate: true })}
            options={["Tấn","Kg","Cái","Lít","m³","Khác"].map(s=>({label:s,value:s}))}
            error={err("product_unit_cy")} />
          <FormField kind="number" label="Khối lượng (năm gần nhất)" value={v?.product_volume_py ?? ""}
            onChange={(num) => setNum("step1.product_volume_py", num)} error={err("product_volume_py")} />
          <FormField kind="select" label="Đơn vị (năm gần nhất)" value={v?.product_unit_py ?? ""}
            onChange={(val) => setValue("step1.product_unit_py" as any, val, { shouldDirty: true, shouldValidate: true })}
            options={["Tấn","Kg","Cái","Lít","m³","Khác"].map(s=>({label:s,value:s}))}
            error={err("product_unit_py")} />
        </div>
      </FormSection>

      <FormSection title="Nhiên liệu tiêu thụ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField kind="number" label="Năm báo cáo" value={v?.fuel_consumption_cy ?? ""}
            onChange={(num) => setNum("step1.fuel_consumption_cy", num)} error={err("fuel_consumption_cy")} />
          <FormField kind="select" label="Đơn vị (năm báo cáo)" value={v?.fuel_unit_cy ?? ""}
            onChange={(val) => setValue("step1.fuel_unit_cy" as any, val, { shouldDirty: true, shouldValidate: true })}
            options={["Lít","Kg","Tấn","m³","Khác"].map(s=>({label:s,value:s}))}
            error={err("fuel_unit_cy")} />
          <FormField kind="number" label="Năm gần nhất" value={v?.fuel_consumption_py ?? ""}
            onChange={(num) => setNum("step1.fuel_consumption_py", num)} error={err("fuel_consumption_py")} />
          <FormField kind="select" label="Đơn vị (năm gần nhất)" value={v?.fuel_unit_py ?? ""}
            onChange={(val) => setValue("step1.fuel_unit_py" as any, val, { shouldDirty: true, shouldValidate: true })}
            options={["Lít","Kg","Tấn","m³","Khác"].map(s=>({label:s,value:s}))}
            error={err("fuel_unit_py")} />
        </div>
      </FormSection>

      <FormSection title="Điện, nước tiêu thụ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField kind="number" label="Điện (kWh) - năm báo cáo" value={v?.electricity_consumption_cy ?? ""}
            onChange={(num) => setNum("step1.electricity_consumption_cy", num)} error={err("electricity_consumption_cy")} />
          <FormField kind="number" label="Điện (kWh) - năm gần nhất" value={v?.electricity_consumption_py ?? ""}
            onChange={(num) => setNum("step1.electricity_consumption_py", num)} error={err("electricity_consumption_py")} />
          <FormField kind="number" label="Nước (m³) - năm báo cáo" value={v?.water_consumption_cy ?? ""}
            onChange={(num) => setNum("step1.water_consumption_cy", num)} error={err("water_consumption_cy")} />
          <FormField kind="number" label="Nước (m³) - năm gần nhất" value={v?.water_consumption_py ?? ""}
            onChange={(num) => setNum("step1.water_consumption_py", num)} error={err("water_consumption_py")} />
        </div>
      </FormSection>
    </div>
  );
}
