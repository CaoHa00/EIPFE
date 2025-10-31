"use client";
import { useFormContext, useFormState } from "react-hook-form";
import FormSection from "../../components/forms/FormSection";
import FormField from "../../components/forms/FormField";
import GroupRepeater from "../../components/forms/GroupRepeater";
import type { Report5AForm } from "../schemas/AllSchema";

export default function Step4() {
  const { watch, setValue, control } = useFormContext<Report5AForm>();
  const { errors } = useFormState({ control });

  const setNum = (path: string, v: number) =>
    setValue(path as any, Number.isNaN(v) ? null : v, { shouldDirty: true, shouldValidate: true });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* General SW note */}
      <FormSection title="Thống kê chất thải phát sinh">
        {(() => {
          const v = watch("step4" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step4?.[k]?.message as string | undefined;
          return (
            <div className="grid grid-cols-1 gap-4">
              <FormField
                kind="textarea"
                label="Ghi chú tổng hợp"
                value={v?.sw_general_note ?? ""}
                onChange={(val) => setValue("step4.sw_general_note" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("sw_general_note")}
                rows={4}
              />
            </div>
          );
        })()}
      </FormSection>
      {/* 3.1 CTRSH (moved from Step3) */}
      <FormSection title="Bảng 3.1 Thống kê CTRSH (Chất thải rắn sinh hoạt)">
        <GroupRepeater
          name="step4.table_3_1_ctrsh"
          title="CTRSH"
          defaultItem={{ ctrshName: "", reportWeight: null as any, receiverOrganization: "", lastYearWeight: null as any }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_3_1_ctrsh?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField kind="text" label="Tên CTRSH" value={v?.ctrshName ?? ""}
                  onChange={(val) => setValue(`${base}.ctrshName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("ctrshName")} />
                <FormField kind="number" label="Khối lượng (tấn) (Năm báo cáo)" value={v?.reportWeight ?? ""}
                  onChange={(num) => setNum(`${base}.reportWeight`, num)} error={err("reportWeight")} />
                <FormField kind="text" label="Tổ chức/cá nhân tiếp nhận" value={v?.receiverOrganization ?? ""}
                  onChange={(val) => setValue(`${base}.receiverOrganization` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("receiverOrganization")} />
                <FormField kind="number" label="Khối lượng năm gần nhất (tấn)" value={v?.lastYearWeight ?? ""}
                  onChange={(num) => setNum(`${base}.lastYearWeight`, num)} error={err("lastYearWeight")} />
                <div className="md:col-span-4 flex justify-end">
                  <button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button>
                </div>
              </div>
            );
          }}
        />
      </FormSection>
      {/* 3.2 CTRCNTT */}
      <FormSection title="Bảng 3.2: Thống kê CTRCNTT (Chất thải rắn công nghiệp thông thường)">
        <GroupRepeater
          name="step4.table_3_2_ctrcntt"
          title="CTRCNTT"
          defaultItem={{ groupName: "", reportWeightKg: null as any, receiverOrganization: "", lastYearWeightKg: null as any }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_3_2_ctrcntt?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField kind="text" label="Nhóm CTRCNTT" value={v?.groupName ?? ""}
                  onChange={(val) => setValue(`${base}.groupName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("groupName")} />
                <FormField kind="number" label="Khối lượng (kg) (Năm báo cáo)" value={v?.reportWeightKg ?? ""}
                  onChange={(num) => setNum(`${base}.reportWeightKg`, num)} error={err("reportWeightKg")} />
                <FormField kind="text" label="Tổ chức/cá nhân tiếp nhận CTRCNTT" value={v?.receiverOrganization ?? ""}
                  onChange={(val) => setValue(`${base}.receiverOrganization` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("receiverOrganization")} />
                <FormField kind="number" label="Khối lượng năm gần nhất (kg)" value={v?.lastYearWeightKg ?? ""}
                  onChange={(num) => setNum(`${base}.lastYearWeightKg`, num)} error={err("lastYearWeightKg")} />
                <div className="md:col-span-4 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 3.3 CTRCNTT reuse */}
      <FormSection title="Bảng 3.3: Thống kê sử dụng CTRCNTT (tái sử dụng, tái chế)">
        <GroupRepeater
          name="step4.table_3_3_ctrcntt_reuse"
          title="Tái sử dụng/tái chế"
          defaultItem={{ transferor: "", reportAmountKg: null as any, wasteType: "", lastYearAmountKg: null as any }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_3_3_ctrcntt_reuse?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField kind="text" label="Tổ chức/cá nhân chuyển giao" value={v?.transferor ?? ""}
                  onChange={(val) => setValue(`${base}.transferor` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("transferor")} />
                <FormField kind="number" label="Số lượng (kg) (Năm báo cáo)" value={v?.reportAmountKg ?? ""}
                  onChange={(num) => setNum(`${base}.reportAmountKg`, num)} error={err("reportAmountKg")} />
                <FormField kind="text" label="Chủng loại chất thải, phế liệu" value={v?.wasteType ?? ""}
                  onChange={(val) => setValue(`${base}.wasteType` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("wasteType")} />
                <FormField kind="number" label="Khối lượng năm gần nhất (kg)" value={v?.lastYearAmountKg ?? ""}
                  onChange={(num) => setNum(`${base}.lastYearAmountKg`, num)} error={err("lastYearAmountKg")} />
                <div className="md:col-span-4 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 3.4 CTRTT other */}
      <FormSection title="Bảng 3.4: Thống kê các loại CTRTT khác (Nếu có)">
        <GroupRepeater
          name="step4.table_3_4_ctrtt_other"
          title="CTRTT khác"
          defaultItem={{ otherGroupName: "", reportWeightKg: null as any, selfTreatmentMethod: "", receiverOrganization: "", lastYearWeightKg: null as any }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_3_4_ctrtt_other?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <FormField kind="text" label="Nhóm CTRTT khác" value={v?.otherGroupName ?? ""}
                  onChange={(val) => setValue(`${base}.otherGroupName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("otherGroupName")} />
                <FormField kind="number" label="Khối lượng (kg) (Năm báo cáo)" value={v?.reportWeightKg ?? ""}
                  onChange={(num) => setNum(`${base}.reportWeightKg`, num)} error={err("reportWeightKg")} />
                <FormField kind="text" label="Phương thức tự xử lý" value={v?.selfTreatmentMethod ?? ""}
                  onChange={(val) => setValue(`${base}.selfTreatmentMethod` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("selfTreatmentMethod")} />
                <FormField kind="text" label="Tổ chức/cá nhân tiếp nhận CTRTT" value={v?.receiverOrganization ?? ""}
                  onChange={(val) => setValue(`${base}.receiverOrganization` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("receiverOrganization")} />
                <FormField kind="number" label="Khối lượng năm gần nhất (kg)" value={v?.lastYearWeightKg ?? ""}
                  onChange={(num) => setNum(`${base}.lastYearWeightKg`, num)} error={err("lastYearWeightKg")} />
                <div className="md:col-span-5 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 4.1 CTNH */}
      <FormSection title="Bảng 4.1: Thống kê CTNH (thường xuyên và đột xuất)">
        <GroupRepeater
          name="step4.table_4_1_ctnh"
          title="CTNH"
          defaultItem={{ wasteName: "", ctnhCode: "", reportAmountKg: null as any, treatmentMethod: "", lastYearAmountKg: null as any, receiverOrganization: "" }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_4_1_ctnh?.[i]?.[k]?.message as string | undefined;
            const options = [
              { label: "Tái sử dụng", value: "reuse" },
              { label: "Tái chế", value: "recycle" },
              { label: "Xử lý", value: "treat" },
              { label: "Chôn lấp", value: "landfill" },
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField kind="text" label="Tên chất thải" value={v?.wasteName ?? ""}
                  onChange={(val) => setValue(`${base}.wasteName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("wasteName")} />
                <FormField kind="text" label="Mã CTNH" value={v?.ctnhCode ?? ""}
                  onChange={(val) => setValue(`${base}.ctnhCode` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("ctnhCode")} />
                <FormField kind="number" label="Số lượng (kg) (Năm báo cáo)" value={v?.reportAmountKg ?? ""}
                  onChange={(num) => setNum(`${base}.reportAmountKg`, num)} error={err("reportAmountKg")} />
                <FormField kind="select" label="Phương pháp xử lý" value={v?.treatmentMethod ?? ""}
                  onChange={(val) => setValue(`${base}.treatmentMethod` as any, val, { shouldDirty: true, shouldValidate: true })}
                  options={options} error={err("treatmentMethod")} />
                <FormField kind="number" label="Khối lượng năm gần nhất (kg)" value={v?.lastYearAmountKg ?? ""}
                  onChange={(num) => setNum(`${base}.lastYearAmountKg`, num)} error={err("lastYearAmountKg")} />
                <FormField kind="textarea" label="Tổ chức/cá nhân tiếp nhận CTNH" value={v?.receiverOrganization ?? ""}
                  onChange={(val) => setValue(`${base}.receiverOrganization` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("receiverOrganization")} rows={3} />
                <div className="md:col-span-3 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 4.2a CTNH export */}
      <FormSection title="Bảng 4.2a: Thống kê các CTNH được xuất khẩu (nếu có)">
        <GroupRepeater
          name="step4.table_4_2a_ctnh_export"
          title="CTNH xuất khẩu"
          defaultItem={{ wasteName: "", ctnhCode: "", baselCode: "", lastYearAmountKg: null as any, crossBorderCarrier: "", foreignProcessor: "" }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_4_2a_ctnh_export?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField kind="text" label="Tên chất thải" value={v?.wasteName ?? ""}
                  onChange={(val) => setValue(`${base}.wasteName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("wasteName")} />
                <FormField kind="text" label="Mã CTNH" value={v?.ctnhCode ?? ""}
                  onChange={(val) => setValue(`${base}.ctnhCode` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("ctnhCode")} />
                <FormField kind="text" label="Mã Basel" value={v?.baselCode ?? ""}
                  onChange={(val) => setValue(`${base}.baselCode` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("baselCode")} />
                <FormField kind="number" label="Khối lượng năm gần nhất (kg)" value={v?.lastYearAmountKg ?? ""}
                  onChange={(num) => setNum(`${base}.lastYearAmountKg`, num)} error={err("lastYearAmountKg")} />
                <FormField kind="textarea" label="Đơn vị vận chuyển xuyên biên giới" value={v?.crossBorderCarrier ?? ""}
                  onChange={(val) => setValue(`${base}.crossBorderCarrier` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("crossBorderCarrier")} rows={3} />
                <FormField kind="textarea" label="Đơn vị xử lý ở nước ngoài" value={v?.foreignProcessor ?? ""}
                  onChange={(val) => setValue(`${base}.foreignProcessor` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("foreignProcessor")} rows={3} />
                <div className="md:col-span-3 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 4.3b CTNH self-treat */}
      <FormSection title="Bảng 4.3b: Thống kê CTNH tự xử lý tại cơ sở (nếu có)">
        <GroupRepeater
          name="step4.table_4_3b_ctnh_self_treat"
          title="CTNH tự xử lý"
          defaultItem={{ wasteName: "", ctnhCode: "", amountKg: null as any, selfReuseProcess: "" }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_4_3b_ctnh_self_treat?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField kind="text" label="Tên chất thải" value={v?.wasteName ?? ""}
                  onChange={(val) => setValue(`${base}.wasteName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("wasteName")} />
                <FormField kind="text" label="Mã CTNH" value={v?.ctnhCode ?? ""}
                  onChange={(val) => setValue(`${base}.ctnhCode` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("ctnhCode")} />
                <FormField kind="number" label="Số lượng (kg)" value={v?.amountKg ?? ""}
                  onChange={(num) => setNum(`${base}.amountKg`, num)} error={err("amountKg")} />
                <div className="md:col-span-3">
                  <FormField kind="textarea" label="Phương thức tự tái sử dụng, sơ chế, xử lý..." value={v?.selfReuseProcess ?? ""}
                    onChange={(val) => setValue(`${base}.selfReuseProcess` as any, val, { shouldDirty: true, shouldValidate: true })}
                    error={err("selfReuseProcess")} rows={3} />
                </div>
                <div className="md:col-span-3 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 6.x Incident prevention and response */}
      <FormSection title="Mục 6: Phòng ngừa, ứng phó và khắc phục sự cố">
        {(() => {
          const v = watch("step4" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step4?.[k]?.message as string | undefined;
          return (
            <div className="grid grid-cols-1 gap-4">
              <FormField
                kind="textarea"
                label="6.1. Việc xây dựng kế hoạch phòng ngừa, ứng phó và khắc phục sự cố"
                value={v?.incident_plan_development ?? ""}
                onChange={(val) => setValue("step4.incident_plan_development" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("incident_plan_development")}
                rows={4}
              />
              <FormField
                kind="textarea"
                label="6.2. Các giải pháp phòng ngừa sự cố môi trường tại cơ sở"
                value={v?.incident_prevention_measures ?? ""}
                onChange={(val) => setValue("step4.incident_prevention_measures" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("incident_prevention_measures")}
                rows={4}
              />
              <FormField
                kind="textarea"
                label="6.3. Việc ứng phó và khắc phục sự cố môi trường đã xảy ra"
                value={v?.incident_response_report ?? ""}
                onChange={(val) => setValue("step4.incident_response_report" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("incident_response_report")}
                rows={4}
              />
            </div>
          );
        })()}
      </FormSection>
      {/* 7.1 Inventory */}
      <FormSection title="Bảng 7.1: Thông tin về chủng loại và khối lượng (Inventory)">
        <GroupRepeater
          name="step4.table_7_1_inventory"
          title="POP/Inventory"
          defaultItem={{ pollutantName: "", casNumber: "", importTime: "", importWeightKg: null as any, concentration: "", usedWeightKg: null as any, storedWeightKg: null as any, complianceAssessment: "" }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step4?.table_7_1_inventory?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <FormField kind="textarea" label="Tên chất ô nhiễm (POP)" value={v?.pollutantName ?? ""}
                    onChange={(val) => setValue(`${base}.pollutantName` as any, val, { shouldDirty: true, shouldValidate: true })}
                    error={err("pollutantName")} rows={3} />
                </div>
                <FormField kind="text" label="Mã CAS" value={v?.casNumber ?? ""}
                  onChange={(val) => setValue(`${base}.casNumber` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("casNumber")} />
                <FormField kind="date" label="Thời điểm nhập khẩu" value={v?.importTime ?? ""}
                  onChange={(val) => setValue(`${base}.importTime` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("importTime")} />
                <FormField kind="number" label="Khối lượng nhập khẩu (kg)" value={v?.importWeightKg ?? ""}
                  onChange={(num) => setNum(`${base}.importWeightKg`, num)} error={err("importWeightKg")} />
                <FormField kind="text" label="Nồng độ (nếu biết)" value={v?.concentration ?? ""}
                  onChange={(val) => setValue(`${base}.concentration` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("concentration")} />
                <FormField kind="number" label="Khối lượng đã sử dụng (kg)" value={v?.usedWeightKg ?? ""}
                  onChange={(num) => setNum(`${base}.usedWeightKg`, num)} error={err("usedWeightKg")} />
                <FormField kind="number" label="Khối lượng còn lưu kho (kg)" value={v?.storedWeightKg ?? ""}
                  onChange={(num) => setNum(`${base}.storedWeightKg`, num)} error={err("storedWeightKg")} />
                <FormField kind="text" label="Kết quả đánh giá sự phù hợp" value={v?.complianceAssessment ?? ""}
                  onChange={(val) => setValue(`${base}.complianceAssessment` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("complianceAssessment")} />
                <div className="md:col-span-3 flex justify-end"><button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button></div>
              </div>
            );
          }}
        />
      </FormSection>

    </div>
  );
}
