"use client";
import { useFormContext, useFormState } from "react-hook-form";
import FormSection from "../../components/forms/FormSection";
import FormField from "../../components/forms/FormField";
import GroupRepeater from "../../components/forms/GroupRepeater";
import type { Report5AForm } from "../schemas/AllSchema";

export default function Step3() {
  const { watch, setValue, control } = useFormContext<Report5AForm>();
  const { errors } = useFormState({ control });

  const setNum = (path: string, v: number) =>
    setValue(path as any, Number.isNaN(v) ? null : v, { shouldDirty: true, shouldValidate: true });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* Khối chi tiết – sau Bảng 1.5 */}
      <FormSection title="Bảo vệ môi trường đối với khí thải">
        {(() => {
          const v = watch("step3.air_summary_block_after_1_5_details" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step3?.air_summary_block_after_1_5_details?.[k]?.message as string | undefined;
          const freqOptions = ["1 Tháng/1 lần", "3 Tháng/1 lần", "6 Tháng/1 lần", "Khác"].map((s) => ({ label: s, value: s }));
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Các công trình xử lý khí thải và thay đổi" value={v?.treatmentChanges_1 ?? ""}
                  onChange={(val) => setValue("step3.air_summary_block_after_1_5_details.treatmentChanges_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("treatmentChanges_1")} rows={3} />
                <FormField kind="number" label="Tổng lưu lượng khí thải (năm báo cáo, m³)" value={v?.totalEmissionYear_m3_1 ?? ""}
                  onChange={(num) => setNum("step3.air_summary_block_after_1_5_details.totalEmissionYear_m3_1", num)} error={err("totalEmissionYear_m3_1")} />
                <FormField kind="number" label="Tổng lưu lượng khí thải (năm gần nhất, m³)" value={v?.totalEmissionLastYear_m3_1 ?? ""}
                  onChange={(num) => setNum("step3.air_summary_block_after_1_5_details.totalEmissionLastYear_m3_1", num)} error={err("totalEmissionLastYear_m3_1")} />
              </div>
              <FormField kind="date" label="Thời gian quan trắc" value={v?.monitoringTime_air_1 ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_1_5_details.monitoringTime_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringTime_air_1")} />
              <FormField kind="select" label="Tần suất quan trắc" value={v?.frequency_air_1 ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_1_5_details.frequency_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                options={freqOptions} error={err("frequency_air_1")} />
              <FormField kind="number" label="Tổng số lượng mẫu" value={v?.totalSamples_air_1 ?? ""}
                onChange={(num) => setNum("step3.air_summary_block_after_1_5_details.totalSamples_air_1", num)} error={err("totalSamples_air_1")} />
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Vị trí các điểm quan trắc" value={v?.monitoringLocations_air_1 ?? ""}
                  onChange={(val) => setValue("step3.air_summary_block_after_1_5_details.monitoringLocations_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("monitoringLocations_air_1")} rows={3} />
              </div>

              <FormField kind="text" label="QCVN áp dụng" value={v?.techStandard_air_1 ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_1_5_details.techStandard_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("techStandard_air_1")} />
              <FormField kind="text" label="Đơn vị thực hiện" value={v?.monitoringUnit_air_1 ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_1_5_details.monitoringUnit_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("monitoringUnit_air_1")} />
              <FormField kind="text" label="Số Vimcerts" value={v?.vimcerts_air_1 ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_1_5_details.vimcerts_air_1" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("vimcerts_air_1")} />
            </div>
          );
        })()}
      </FormSection>


      {/* 2.1 Monitoring */}
      <FormSection title="Bảng 2.1 Thống Kê Vị Trí & Kết Quả Vượt QCVN">
        <GroupRepeater
          name="step3.table_2_1_monitoring"
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
            const err = (k: keyof typeof v) => (errors as any)?.step3?.table_2_1_monitoring?.[i]?.[k]?.message as string | undefined;
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

      <FormSection title="Thông tin chung về hệ thống">
        {(() => {
          const v = watch("step3.auto_station_info_block_2" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step3?.auto_station_info_block_2?.[k]?.message as string | undefined;
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Vị trí, địa điểm lắp đặt trạm" value={v?.stationLocation_2 ?? ""}
                  onChange={(val) => setValue("step3.auto_station_info_block_2.stationLocation_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("stationLocation_2")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Tọa độ trạm (GPS)" value={v?.stationGPS_2 ?? ""}
                  onChange={(val) => setValue("step3.auto_station_info_block_2.stationGPS_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("stationGPS_2")} rows={2} />
              </div>
              <FormField kind="file" label="Bản đồ vị trí đặt trạm" file={v?.siteMap_2 ?? null}
                onChange={(file) => setValue("step3.auto_station_info_block_2.siteMap_2" as any, file ?? null, { shouldDirty: true, shouldValidate: true })} />
              <FormField kind="text" label="Tần suất thu nhận dữ liệu" value={v?.dataAcqFrequency_2 ?? ""}
                onChange={(val) => setValue("step3.auto_station_info_block_2.dataAcqFrequency_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("dataAcqFrequency_2")} />
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Mô tả đặc điểm nguồn thải" value={v?.sourceDescription_2 ?? ""}
                  onChange={(val) => setValue("step3.auto_station_info_block_2.sourceDescription_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("sourceDescription_2")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Danh mục thông số quan trắc và giá trị QCVN" value={v?.parameterCatalog_2 ?? ""}
                  onChange={(val) => setValue("step3.auto_station_info_block_2.parameterCatalog_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("parameterCatalog_2")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Thông tin hiệu chuẩn, kiểm định thiết bị" value={v?.calibrationInfo_2 ?? ""}
                  onChange={(val) => setValue("step3.auto_station_info_block_2.calibrationInfo_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("calibrationInfo_2")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Các sự cố với hệ thống" value={v?.systemIncidents_2 ?? ""}
                  onChange={(val) => setValue("step3.auto_station_info_block_2.systemIncidents_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("systemIncidents_2")} rows={3} />
              </div>
              <div className="md:col-span-3">
                <FormField kind="textarea" label="Các khoảng thời gian hệ thống tạm dừng" value={v?.downtime_2 ?? ""}
                  onChange={(val) => setValue("step3.auto_station_info_block_2.downtime_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("downtime_2")} rows={3} />
              </div>
            </div>
          );
        })()}
      </FormSection>
      {/* 2.2 Statistics */}
      <FormSection title="Bảng 2.2 Thống kê số liệu quan trắc">
        <GroupRepeater
          name="step3.table_2_2_statistics"
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
            const err = (k: keyof typeof v) => (errors as any)?.step3?.table_2_2_statistics?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <FormField kind="text" label="Tên thông số" value={v?.parameterName ?? ""}
                  onChange={(val) => setValue(`${base}.parameterName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("parameterName")} />
                <FormField kind="number" label="Theo thiết kế" value={v?.designValueCount ?? ""}
                  onChange={(num) => setNum(`${base}.designValueCount`, num)} error={err("designValueCount")} />
                <FormField kind="number" label="Nhận được" value={v?.receivedValueCount ?? ""}
                  onChange={(num) => setNum(`${base}.receivedValueCount`, num)} error={err("receivedValueCount")} />
                <FormField kind="number" label="Lỗi/bất thường" value={v?.abnormalValueCount ?? ""}
                  onChange={(num) => setNum(`${base}.abnormalValueCount`, num)} error={err("abnormalValueCount")} />
                <FormField kind="number" label="Tỉ lệ (%)" value={v?.ratioReceived ?? ""}
                  onChange={(num) => setNum(`${base}.ratioReceived`, num)} error={err("ratioReceived")} />
                <div className="md:col-span-5 flex justify-end">
                  <button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button>
                </div>
              </div>
            );
          }}
        />
      </FormSection>

      {/* 2.3 Incidents */}
      <FormSection title="Bảng 2.3 Thống kê các sự cố tại trạm">
        <GroupRepeater
          name="step3.table_2_3_incidents"
          title="Sự cố"
          defaultItem={{ issueName: "", issueTime: "", causeAndSolution: "" }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step3?.table_2_3_incidents?.[i]?.[k]?.message as string | undefined;
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
       <FormSection title="Nhận xét kết quả quan trắc">
        {(() => {
          const v = watch("step3.air_summary_block_after_2_4" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step3?.air_summary_block_after_2_4?.[k]?.message as string | undefined;
          return (
            <div className="grid grid-cols-1 gap-4">
              <FormField kind="textarea" label="Tính toán giá trị trung bình 1 giờ" value={v?.avg1hCalc ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_2_4.avg1hCalc" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("avg1hCalc")} rows={3} />
              <FormField kind="textarea" label="So sánh giá trị trung bình 1 giờ với QCVN" value={v?.avg1hCompareQcvn ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_2_4.avg1hCompareQcvn" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("avg1hCompareQcvn")} rows={3} />
              <FormField kind="textarea" label="Lý giải các số liệu quan trắc bất thường" value={v?.abnormalExplain ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_2_4.abnormalExplain" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("abnormalExplain")} rows={3} />
              <FormField kind="textarea" label="Thống kê các ngày có giá trị vượt QCVN" value={v?.exceedDaysStats ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_2_4.exceedDaysStats" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("exceedDaysStats")} rows={3} />
            </div>
          );
        })()}
      </FormSection>

      {/* 2.4 Exceed */}
      <FormSection title="Bảng 2.4 Thống kê vượt QCVN (theo từng thông số)">
        <GroupRepeater
          name="step3.table_2_4_exceed"
          title="Thông số vượt"
          defaultItem={{ parameterName: "", exceedDayCount: null as any, exceedRatio: null as any }}
          renderItem={(base, i, remove) => {
            const v = watch(base as any) as any;
            const err = (k: keyof typeof v) => (errors as any)?.step3?.table_2_4_exceed?.[i]?.[k]?.message as string | undefined;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField kind="text" label="Tên thông số" value={v?.parameterName ?? ""}
                  onChange={(val) => setValue(`${base}.parameterName` as any, val, { shouldDirty: true, shouldValidate: true })}
                  error={err("parameterName")} />
                <FormField kind="number" label="Số ngày vượt" value={v?.exceedDayCount ?? ""}
                  onChange={(num) => setNum(`${base}.exceedDayCount`, num)} error={err("exceedDayCount")} />
                <FormField kind="number" label="Tỷ lệ (%)" value={v?.exceedRatio ?? ""}
                  onChange={(num) => setNum(`${base}.exceedRatio`, num)} error={err("exceedRatio")} />
                <div className="md:col-span-3 flex justify-end">
                  <button type="button" className="px-3 h-10 rounded-lg border bg-white" onClick={remove}>Xóa</button>
                </div>
              </div>
            );
          }}
        />
      </FormSection>

     


     
      <FormSection title="Kết luận">
        {(() => {
          const v = watch("step3.air_summary_block_after_2_4" as any) as any;
          const err = (k: keyof typeof v) => (errors as any)?.step3?.air_summary_block_after_2_4?.[k]?.message as string | undefined;
          return (
            <div className="grid grid-cols-1 gap-4">
               <FormField kind="textarea" label="Nhận định về mức độ đầy đủ của dữ liệu thu nhận" value={v?.dataCompletenessAssessment_2 ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_2_4.dataCompletenessAssessment_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("dataCompletenessAssessment_2")} rows={3} />
              <FormField kind="textarea" label="Thông số và thời gian vượt ngưỡng so với QCVN" value={v?.exceedParamsAndTime_2 ?? ""}
                onChange={(val) => setValue("step3.air_summary_block_after_2_4.exceedParamsAndTime_2" as any, val, { shouldDirty: true, shouldValidate: true })}
                error={err("exceedParamsAndTime_2")} rows={3} />
            </div>
          );
        })()}
      </FormSection>

    </div>
  );
}
