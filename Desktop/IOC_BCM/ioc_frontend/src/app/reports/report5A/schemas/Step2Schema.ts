import { z } from "zod";

const DateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày không hợp lệ (YYYY-MM-DD)");
// Bảng 1.1 Thống Kê Vị Trí & Kết Quả Vượt QCVN
export const Table111MonitoringItemSchema = z.object({
  monitoringPointName: z.string().min(1, "Nhập tên điểm"),
  monitoringPointCode: z.string().min(1, "Nhập ký hiệu"),
  monitoringTime: DateString,
  longitude: z.string().min(1, "Nhập kinh độ"),
  latitude: z.string().min(1, "Nhập vĩ độ"),
  qcMetric: z.string().min(1, "Nhập chỉ tiêu"),
  monitoringResult: z.string().min(1, "Nhập kết quả"),
  qcValue: z.string().min(1, "Nhập giá trị QCVN"),
});

export const Step2Schema = z.object({
  // Bảng 1.1
  table_1_1_monitoring: z.array(Table111MonitoringItemSchema).default([]),

  // Bảng 1.3
  table_1_3_statistics: z
    .array(
      z.object({
        parameterName: z.string().min(1, "Nhập tên thông số"),
        designValueCount: z.number().min(0, ">= 0"),
        receivedValueCount: z.number().min(0, ">= 0"),
        abnormalValueCount: z.number().min(0, ">= 0"),
        ratioReceived: z.number().min(0, ">= 0").max(100, "<= 100"),
      })
    )
    .default([]),

  // Bảng 1.4
  table_1_4_incidents: z
    .array(
      z.object({
        issueName: z.string().min(1, "Nhập tên sự cố"),
        issueTime: DateString,
        causeAndSolution: z.string().min(1, "Nhập nguyên nhân & biện pháp"),
      })
    )
    .default([]),

  // Bảng 1.5
  table_1_5_exceed: z
    .array(
      z.object({
        parameterName: z.string().min(1, "Nhập thông số"),
        exceedDayCount: z.number().min(0, ">= 0"),
        qcValue: z.number().min(0, ">= 0"),
        exceedRatio: z.number().min(0, ">= 0").max(100, "<= 100"),
      })
    )
    .default([]),

  congTrinhXuLyNuocThai: z.string().optional().nullable(),

  // Nước thải sinh hoạt
  sinhHoat_baoCao: z.number().min(0, "Lớn hơn hoặc bằng 0"),
  sinhHoat_ganNhat: z
    .number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .nullable()
    .optional(),
  sinhHoat_thietKe: z.number().min(0, "Lớn hơn hoặc bằng 0"),

  // Nước thải công nghiệp
  congNghiep_baoCao: z
    .number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .nullable()
    .optional(),
  congNghiep_ganNhat: z
    .number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .nullable()
    .optional(),
  congNghiep_thietKe: z
    .number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .nullable()
    .optional(),

  // Nước làm mát
  lamMat_baoCao: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),
  lamMat_ganNhat: z
    .number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .nullable()
    .optional(),
  lamMat_thietKe: z
    .number()
    .min(0, "Lớn hơn hoặc bằng 0")
    .nullable()
    .optional(),

  // Tình hình đấu nối
  tinhHinhDauNoiXLNT: z.string().optional().nullable(),
  // domestic water
  domestic_wastewater: z
    .object({
      monitoringTime_dom: DateString,
      frequency_dom: z.string().min(1, "Chọn tần suất"),
      locations_dom: z.string().min(1, "Nhập vị trí"),
      totalSamples_dom: z.number().min(0, ">= 0"),
      techStandard_dom: z.string().min(1, "Nhập quy chuẩn/kỹ thuật"),
      monitoringUnit_dom: z.string().min(1, "Nhập đơn vị"),
      vimcerts_dom: z.string().min(1, "Nhập số Vimcerts"),
    })
    .default({
      monitoringTime_dom: "",
      frequency_dom: "",
      locations_dom: "",
      totalSamples_dom: 0,
      techStandard_dom: "",
      monitoringUnit_dom: "",
      vimcerts_dom: "",
    }),
  //industrial water
  industrial_wastewater: z
    .object({
      monitoringTime_ind: DateString,
      frequency_ind: z.string().min(1, "Chọn tần suất"),
      locations_ind: z.string().min(1, "Nhập vị trí"),
      totalSamples_ind: z.number().min(0, ">= 0"),
      techStandard_ind: z.string().min(1, "Nhập quy chuẩn/kỹ thuật"),
      monitoringUnit_ind: z.string().min(1, "Nhập đơn vị"),
      vimcerts_ind: z.string().min(1, "Nhập số Vimcerts"),
    })
    .default({
      monitoringTime_ind: "",
      frequency_ind: "",
      locations_ind: "",
      totalSamples_ind: 0,
      techStandard_ind: "",
      monitoringUnit_ind: "",
      vimcerts_ind: "",
    }),

  auto_station_info: z
    .object({
      stationLocation: z.string().min(1, "Nhập vị trí trạm"),
      stationGPS: z.string().min(1, "Nhập tọa độ"),
      siteMap: z.any().optional().nullable(),
      sourceDescription: z.string().min(1, "Nhập mô tả nguồn thải"),
      dataAcqFrequency: z.string().min(1, "Nhập tần suất"),
      calibrationInfo: z.string().min(1, "Nhập thông tin hiệu chuẩn"),
      systemIncidents: z.string().min(1, "Nhập sự cố"),
      downtime: z.string().min(1, "Nhập thời gian dừng"),
    })
    .default({
      stationLocation: "",
      stationGPS: "",
      siteMap: null,
      sourceDescription: "",
      dataAcqFrequency: "",
      calibrationInfo: "",
      systemIncidents: "",
      downtime: "",
    }),
  // Khối mô tả – sau Bảng 1.5 (giữ 2 trường)
  air_summary_block_after_1_5: z
    .object({
      dataCompletenessAssessment_1: z.string().min(1, "Nhập nhận định"),
      exceedParamsAndTime_1: z.string().min(1, "Nhập thông tin"),
    })
    .default({
      dataCompletenessAssessment_1: "",
      exceedParamsAndTime_1: "",
    }),
  // Optional auto text blocks
  auto_exceed_days_summary: z.string().optional().nullable(),
  auto_abnormal_reason: z.string().optional().nullable(),
});

export type Step2 = z.infer<typeof Step2Schema>;
