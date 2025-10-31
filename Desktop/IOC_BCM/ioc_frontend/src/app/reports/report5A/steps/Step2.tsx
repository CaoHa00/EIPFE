"use client";

import { useFormContext, useFormState } from "react-hook-form";
import FormSection from "../../components/forms/FormSection";
import FormField from "../../components/forms/FormField";
import type { Report5AForm } from "../schemas/AllSchema";
import type { Step2 as Step2Type } from "../schemas/Step2Schema";
import GroupRepeater from "../../components/forms/GroupRepeater";

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
          <FormField
            kind="file"
            label="Sơ đồ/Diagram đấu nối"
            file={v?.connection_diagram ?? ""}
            onChange={(val) => setValue("step2.connection_diagram", val, { shouldDirty: true, shouldValidate: true })}
            error={err("connection_diagram")}
          />
        </div>
      </FormSection>




      {/* Domestic wastewater */}
      <FormSection title="Nước thải sinh hoạt (domestic)">
        {(() => {
          const v = watch("step2.domestic_wastewater" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step2?.domestic_wastewater?.[k]?.message as string | undefined;
          const freqOptions = ["1 Tháng/1 lần", "3 Tháng/1 lần", "6 Tháng/1 lần", "Khác"].map((s) => ({ label: s, value: s }));
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField kind="date" label="Thời gian quan trắc" value={v?.monitoringTime_dom ?? ""}
                onChange={(val) => setValue("step2.domestic_wastewater.monitoringTime_dom" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringTime_dom")} />
              <FormField kind="select" label="Tần suất quan trắc" value={v?.frequency_dom ?? ""}
                onChange={(val) => setValue("step2.domestic_wastewater.frequency_dom" as any, val, { shouldDirty: true, shouldValidate: true })}
                options={freqOptions} error={err("frequency_dom")} />
              <FormField kind="number" label="Tổng số lượng mẫu" value={v?.totalSamples_dom ?? ""}
                onChange={(num) => setNum("step2.domestic_wastewater.totalSamples_dom", num)} error={err("totalSamples_dom")} />
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Vị trí các điểm quan trắc" value={v?.locations_dom ?? ""}
                  onChange={(val) => setValue("step2.domestic_wastewater.locations_dom" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("locations_dom")} rows={3} />
              </div>
              <FormField kind="text" label="Quy chuẩn/kỹ thuật áp dụng" value={v?.techStandard_dom ?? ""}
                onChange={(val) => setValue("step2.domestic_wastewater.techStandard_dom" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("techStandard_dom")} />
              <FormField kind="text" label="Đơn vị thực hiện quan trắc" value={v?.monitoringUnit_dom ?? ""}
                onChange={(val) => setValue("step2.domestic_wastewater.monitoringUnit_dom" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringUnit_dom")} />
              <FormField kind="text" label="Số Vimcerts" value={v?.vimcerts_dom ?? ""}
                onChange={(val) => setValue("step2.domestic_wastewater.vimcerts_dom" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("vimcerts_dom")} />
            </div>
          );
        })()}
      </FormSection>
      {/* Industrial wastewater */}
      <FormSection title="Nước thải công nghiệp (industry)">
        {(() => {
          const v = watch("step2.industrial_wastewater" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step2?.industrial_wastewater?.[k]?.message as string | undefined;
          const freqOptions = ["1 Tháng/1 lần", "3 Tháng/1 lần", "6 Tháng/1 lần", "Khác"].map((s) => ({ label: s, value: s }));
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField kind="date" label="Thời gian quan trắc" value={v?.monitoringTime_ind ?? ""}
                onChange={(val) => setValue("step2.industrial_wastewater.monitoringTime_ind" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringTime_ind")} />
              <FormField kind="select" label="Tần suất quan trắc" value={v?.frequency_ind ?? ""}
                onChange={(val) => setValue("step2.industrial_wastewater.frequency_ind" as any, val, { shouldDirty: true, shouldValidate: true })}
                options={freqOptions} error={err("frequency_ind")} />
              <FormField kind="number" label="Tổng số lượng mẫu" value={v?.totalSamples_ind ?? ""}
                onChange={(num) => setNum("step2.industrial_wastewater.totalSamples_ind", num)} error={err("totalSamples_ind")} />
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Vị trí các điểm quan trắc" value={v?.locations_ind ?? ""}
                  onChange={(val) => setValue("step2.industrial_wastewater.locations_ind" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("locations_ind")} rows={3} />
              </div>
              <FormField kind="text" label="Quy chuẩn/kỹ thuật áp dụng" value={v?.techStandard_ind ?? ""}
                onChange={(val) => setValue("step2.industrial_wastewater.techStandard_ind" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("techStandard_ind")} />
              <FormField kind="text" label="Đơn vị thực hiện quan trắc" value={v?.monitoringUnit_ind ?? ""}
                onChange={(val) => setValue("step2.industrial_wastewater.monitoringUnit_ind" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringUnit_ind")} />
              <FormField kind="text" label="Số Vimcerts" value={v?.vimcerts_ind ?? ""}
                onChange={(val) => setValue("step2.industrial_wastewater.vimcerts_ind" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("vimcerts_ind")} />
            </div>
          );
        })()}
      </FormSection>
      {/* 1.1 Monitoring */}
      <FormSection title="Bảng 1.1 Thống Kê Vị Trí & Kết Quả Vượt QCVN">
        <GroupRepeater
          name="step2.table_1_1_monitoring"
          title="Điểm quan trắc"
          defaultItem={{
            monitoringPointName: "",
            monitoringPointCode: "",
            monitoringTime: "",
            longitude: "",
            latitude: "",
            qcMetric: "",
            monitoringResult: "",
            qcValue: "",
          }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step2?.table_1_1_monitoring?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField kind="text" label="Tên điểm quan trắc" value={v?.monitoringPointName ?? ""}
                  onChange={(val) => setValue(`${base}.monitoringPointName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("monitoringPointName")} />
                <FormField kind="text" label="Ký hiệu điểm" value={v?.monitoringPointCode ?? ""}
                  onChange={(val) => setValue(`${base}.monitoringPointCode` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("monitoringPointCode")} />
                <FormField kind="date" label="Thời gian quan trắc" value={v?.monitoringTime ?? ""}
                  onChange={(val) => setValue(`${base}.monitoringTime` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("monitoringTime")} />
                <FormField kind="text" label="Kinh độ (Vị trí lấy mẫu)" value={v?.longitude ?? ""}
                  onChange={(val) => setValue(`${base}.longitude` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("longitude")} />
                <FormField kind="text" label="Vĩ độ (Vị trí lấy mẫu)" value={v?.latitude ?? ""}
                  onChange={(val) => setValue(`${base}.latitude` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("latitude")} />
                <FormField kind="text" label="Chỉ tiêu vượt QCVN" value={v?.qcMetric ?? ""}
                  onChange={(val) => setValue(`${base}.qcMetric` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("qcMetric")} />
                <FormField kind="text" label="Kết quả quan trắc" value={v?.monitoringResult ?? ""}
                  onChange={(val) => setValue(`${base}.monitoringResult` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("monitoringResult")} />
                <FormField kind="text" label="Giá trị QCVN" value={v?.qcValue ?? ""}
                  onChange={(val) => setValue(`${base}.qcValue` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("qcValue")} />
                <div className="flex items-end">
                  <button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button>
                </div>
              </div>
            );
          }}
        />
      </FormSection>
      {/* Auto station info (general) */}
      <FormSection title="Quan trắc nước thải liên tục tự động">
        {(() => {
          const v = watch("step2.auto_station_info" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step2?.auto_station_info?.[k]?.message as string | undefined;
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Vị trí, địa điểm lắp đặt trạm" value={v?.stationLocation ?? ""}
                  onChange={(val) => setValue("step2.auto_station_info.stationLocation" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("stationLocation")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Tọa độ trạm (GPS)" value={v?.stationGPS ?? ""}
                  onChange={(val) => setValue("step2.auto_station_info.stationGPS" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("stationGPS")} rows={2} />
              </div>
              <FormField kind="file" label="Bản đồ vị trí đặt trạm" file={v?.siteMap ?? null}
                onChange={(file) => setValue("step2.auto_station_info.siteMap" as any, file ?? null, { shouldDirty: true, shouldValidate: true })} />
              <FormField kind="text" label="Tần suất thu nhận dữ liệu" value={v?.dataAcqFrequency ?? ""}
                onChange={(val) => setValue("step2.auto_station_info.dataAcqFrequency" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("dataAcqFrequency")} />
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Mô tả đặc điểm nguồn thải được giám sát" value={v?.sourceDescription ?? ""}
                  onChange={(val) => setValue("step2.auto_station_info.sourceDescription" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("sourceDescription")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Thông tin hiệu chuẩn, kiểm định thiết bị" value={v?.calibrationInfo ?? ""}
                  onChange={(val) => setValue("step2.auto_station_info.calibrationInfo" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("calibrationInfo")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Các sự cố với hệ thống (Nguyên nhân, Khắc phục)" value={v?.systemIncidents ?? ""}
                  onChange={(val) => setValue("step2.auto_station_info.systemIncidents" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("systemIncidents")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Các khoảng thời gian hệ thống tạm dừng hoạt động" value={v?.downtime ?? ""}
                  onChange={(val) => setValue("step2.auto_station_info.downtime" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("downtime")} rows={3} />
              </div>
            </div>
          );
        })()}
      </FormSection>

      {/* 1.3 Statistics */}
      <FormSection title="Bảng 1.3 Thống kê số liệu quan trắc">
        <GroupRepeater
          name="step2.table_1_3_statistics"
          title="Thông số"
          defaultItem={{
            parameterName: "",
            designValueCount: null as any,
            receivedValueCount: null as any,
            abnormalValueCount: null as any,
            ratioReceived: null as any,
          }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step2?.table_1_3_statistics?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <FormField kind="text" label="Tên thông số" value={v?.parameterName ?? ""}
                  onChange={(val) => setValue(`${base}.parameterName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("parameterName")} />
                <FormField kind="number" label="Theo thiết kế" value={v?.designValueCount ?? ""}
                  onChange={(num) => setValue(`${base}.designValueCount` as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true })} error={err("designValueCount")} />
                <FormField kind="number" label="Nhận được" value={v?.receivedValueCount ?? ""}
                  onChange={(num) => setValue(`${base}.receivedValueCount` as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true })} error={err("receivedValueCount")} />
                <FormField kind="number" label="Lỗi/bất thường" value={v?.abnormalValueCount ?? ""}
                  onChange={(num) => setValue(`${base}.abnormalValueCount` as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true })} error={err("abnormalValueCount")} />
                <FormField kind="number" label="Tỉ lệ (%)" value={v?.ratioReceived ?? ""}
                  onChange={(num) => setValue(`${base}.ratioReceived` as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true })} error={err("ratioReceived")} />
                <div className="md:col-span-5 flex justify-end">
                  <button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button>
                </div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 1.4 Incidents */}
      <FormSection title="Bảng 1.4 Thống kê các sự cố tại trạm">
        <GroupRepeater
          name="step2.table_1_4_incidents"
          title="Sự cố"
          defaultItem={{ issueName: "", issueTime: "", causeAndSolution: "" }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step2?.table_1_4_incidents?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField kind="text" label="Tên sự cố" value={v?.issueName ?? ""}
                  onChange={(val) => setValue(`${base}.issueName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("issueName")} />
                <FormField kind="date" label="Thời gian xảy ra" value={v?.issueTime ?? ""}
                  onChange={(val) => setValue(`${base}.issueTime` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("issueTime")} />
                <div />
                <div className="md:col-span-3">
                  <FormField kind="textarea" label="Nguyên nhân và biện pháp khắc phục" value={v?.causeAndSolution ?? ""}
                    onChange={(val) => setValue(`${base}.causeAndSolution` as any, val, { shouldDirty: true, shouldValidate: true })}
                    error={err("causeAndSolution")} rows={3} />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button>
                </div>
              </div>
            );
          }}
        />
      </FormSection>
      {/* Tổng hợp tự động */}
      <FormSection title="Tổng hợp tự động">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            kind="textarea"
            label="Thống kê các ngày có giá trị vượt QCVN"
            value={v?.auto_exceed_days_summary ?? ""}
            onChange={(val) => setValue("step2.auto_exceed_days_summary", val, { shouldDirty: true, shouldValidate: true })}
            error={err("auto_exceed_days_summary" as any)}
            rows={3}
          />
          <FormField
            kind="textarea"
            label="Lý giải các số liệu quan trắc bất thường"
            value={v?.auto_abnormal_reason ?? ""}
            onChange={(val) => setValue("step2.auto_abnormal_reason", val, { shouldDirty: true, shouldValidate: true })}
            error={err("auto_abnormal_reason" as any)}
            rows={3}
          />
        </div>
      </FormSection>
      {/* 1.5 Exceed */}
      <FormSection title="Bảng 1.5 Thống kê vượt QCVN (theo từng thông số)">
        <GroupRepeater
          name="step2.table_1_5_exceed"
          title="Thông số vượt"
          defaultItem={{ parameterName: "", exceedDayCount: null as any, qcValue: null as any, exceedRatio: null as any }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step2?.table_1_5_exceed?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField kind="text" label="Tên thông số" value={v?.parameterName ?? ""}
                  onChange={(val) => setValue(`${base}.parameterName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("parameterName")} />
                <FormField kind="number" label="Số ngày vượt" value={v?.exceedDayCount ?? ""}
                  onChange={(num) => setValue(`${base}.exceedDayCount` as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true })} error={err("exceedDayCount")} />
                <FormField kind="number" label="Giá trị QCVN" value={v?.qcValue ?? ""}
                  onChange={(num) => setValue(`${base}.qcValue` as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true })} error={err("qcValue")} />
                <FormField kind="number" label="Tỷ lệ (%)" value={v?.exceedRatio ?? ""}
                  onChange={(num) => setValue(`${base}.exceedRatio` as any, Number.isNaN(num) ? null : num, { shouldDirty: true, shouldValidate: true })} error={err("exceedRatio")} />
                <div className="md:col-span-4 flex justify-end">
                  <button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button>
                </div>
              </div>
            );
          }}
        />
      </FormSection>
      {/* Khối mô tả – sau Bảng 1.5 */}
      <FormSection title="Kết luận">
        {(() => {
          const v = watch("step2.air_summary_block_after_1_5" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step2?.air_summary_block_after_1_5?.[k]?.message as string | undefined;
          const freqOptions = ["1 Tháng/1 lần", "3 Tháng/1 lần", "6 Tháng/1 lần", "Khác"].map((s) => ({ label: s, value: s }));
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Nhận định về mức độ đầy đủ của dữ liệu" value={v?.dataCompletenessAssessment_1 ?? ""}
                  onChange={(val) => setValue("step2.air_summary_block_after_1_5.dataCompletenessAssessment_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("dataCompletenessAssessment_1")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Thông số và thời gian vượt ngưỡng" value={v?.exceedParamsAndTime_1 ?? ""}
                  onChange={(val) => setValue("step2.air_summary_block_after_1_5.exceedParamsAndTime_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("exceedParamsAndTime_1")} rows={3} />
              </div>
              {/* <div className="md:col-span-3">
                <FormField kind="textarea" label="Các công trình xử lý khí thải và thay đổi" value={v?.treatmentChanges_1 ?? ""}
                  onChange={(val) => setValue("step2.air_summary_block_after_1_5.treatmentChanges_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("treatmentChanges_1")} rows={3} />
              </div>
              <FormField kind="date" label="Thời gian quan trắc" value={v?.monitoringTime_air_1 ?? ""}
                onChange={(val) => setValue("step2.air_summary_block_after_1_5.monitoringTime_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringTime_air_1")} />
              <FormField kind="select" label="Tần suất quan trắc" value={v?.frequency_air_1 ?? ""}
                onChange={(val) => setValue("step2.air_summary_block_after_1_5.frequency_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                options={freqOptions} error={err("frequency_air_1")} />
              <FormField kind="number" label="Tổng số lượng mẫu" value={v?.totalSamples_air_1 ?? ""}
                onChange={(num) => setNum("step2.air_summary_block_after_1_5.totalSamples_air_1", num)} error={err("totalSamples_air_1")} />
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Vị trí các điểm quan trắc" value={v?.monitoringLocations_air_1 ?? ""}
                  onChange={(val) => setValue("step2.air_summary_block_after_1_5.monitoringLocations_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("monitoringLocations_air_1")} rows={3} />
              </div>
              <FormField kind="number" label="Tổng lưu lượng khí thải (năm báo cáo, m³)" value={v?.totalEmissionYear_m3_1 ?? ""}
                onChange={(num) => setNum("step2.air_summary_block_after_1_5.totalEmissionYear_m3_1", num)} error={err("totalEmissionYear_m3_1")} />
              <FormField kind="number" label="Tổng lưu lượng khí thải (năm gần nhất, m³)" value={v?.totalEmissionLastYear_m3_1 ?? ""}
                onChange={(num) => setNum("step2.air_summary_block_after_1_5.totalEmissionLastYear_m3_1", num)} error={err("totalEmissionLastYear_m3_1")} />
              <FormField kind="text" label="QCVN áp dụng" value={v?.techStandard_air_1 ?? ""}
                onChange={(val) => setValue("step2.air_summary_block_after_1_5.techStandard_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("techStandard_air_1")} />
              <FormField kind="text" label="Đơn vị thực hiện" value={v?.monitoringUnit_air_1 ?? ""}
                onChange={(val) => setValue("step2.air_summary_block_after_1_5.monitoringUnit_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringUnit_air_1")} />
              <FormField kind="text" label="Số Vimcerts" value={v?.vimcerts_air_1 ?? ""}
                onChange={(val) => setValue("step2.air_summary_block_after_1_5.vimcerts_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("vimcerts_air_1")} /> */}
            </div>
          );
        })()}
      </FormSection>


    </div>
  );
}
