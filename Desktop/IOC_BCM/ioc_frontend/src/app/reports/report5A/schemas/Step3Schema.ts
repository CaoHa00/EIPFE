import { z } from "zod";

const DateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày không hợp lệ (YYYY-MM-DD)");



// Bảng 2.1 Thống Kê Vị Trí & Kết Quả Vượt QCVN
export const Table21MonitoringItemSchema = z.object({
  monitoringPointName: z.string().min(1, "Nhập tên điểm"),
  monitoringPointCode: z.string().min(1, "Nhập ký hiệu"),
  monitoringTime: DateString,
  longitude: z.string().min(1, "Nhập kinh độ"),
  latitude: z.string().min(1, "Nhập vĩ độ"),
  qcMetric: z.string().min(1, "Nhập chỉ tiêu"),
  monitoringResult: z.string().min(1, "Nhập kết quả"),
  qcValue: z.string().min(1, "Nhập giá trị QCVN"),
});

// Bảng 2.2 Thống kê số liệu quan trắc
export const Table22StatisticsItemSchema = z.object({
  parameterName: z.string().min(1, "Nhập tên thông số"),
  designValueCount: z.number().min(0, ">= 0"),
  receivedValueCount: z.number().min(0, ">= 0"),
  abnormalValueCount: z.number().min(0, ">= 0"),
  ratioReceived: z.number().min(0, ">= 0").max(100, "<= 100"),
});

// Bảng 2.3 Thống kê sự cố
export const Table23IncidentsItemSchema = z.object({
  issueName: z.string().min(1, "Nhập tên sự cố"),
  issueTime: DateString,
  causeAndSolution: z.string().min(1, "Nhập nguyên nhân & biện pháp"),
});

// Bảng 2.4 Thống kê vượt QCVN
export const Table24ExceedItemSchema = z.object({
  parameterName: z.string().min(1, "Nhập thông số"),
  exceedDayCount: z.number().min(0, ">= 0"),
  exceedRatio: z.number().min(0, ">= 0").max(100, "<= 100"),
});



export const Step3Schema = z.object({
  table_2_1_monitoring: z.array(Table21MonitoringItemSchema).default([]),
  table_2_2_statistics: z.array(Table22StatisticsItemSchema).default([]),
  table_2_3_incidents: z.array(Table23IncidentsItemSchema).default([]),
  table_2_4_exceed: z.array(Table24ExceedItemSchema).default([]),
  // moved to step4: table_3_1_ctrsh
  // --- New object groups (non-repeater) ---

  // air_summary_block_after_1_5: z
  //   .object({
  //     dataCompletenessAssessment_1: z.string().min(1, "Nhập nhận định"),
  //     exceedParamsAndTime_1: z.string().min(1, "Nhập thông tin"),
  //     treatmentChanges_1: z.string().min(1, "Nhập thay đổi"),
  //     monitoringTime_air_1: DateString,
  //     monitoringLocations_air_1: z.string().min(1, "Nhập vị trí"),
  //     totalEmissionYear_m3_1: z.number().min(0, ">= 0"),
  //     totalEmissionLastYear_m3_1: z.number().min(0, ">= 0"),
  //     frequency_air_1: z.string().min(1, "Chọn tần suất"),
  //     totalSamples_air_1: z.number().min(0, ">= 0"),
  //     techStandard_air_1: z.string().min(1, "Nhập QCVN"),
  //     monitoringUnit_air_1: z.string().min(1, "Nhập đơn vị"),
  //     vimcerts_air_1: z.string().min(1, "Nhập Vimcerts"),
  //   })
  //   .default({
  //     dataCompletenessAssessment_1: "",
  //     exceedParamsAndTime_1: "",
  //     treatmentChanges_1: "",
  //     monitoringTime_air_1: "",
  //     monitoringLocations_air_1: "",
  //     totalEmissionYear_m3_1: 0,
  //     totalEmissionLastYear_m3_1: 0,
  //     frequency_air_1: "",
  //     totalSamples_air_1: 0,
  //     techStandard_air_1: "",
  //     monitoringUnit_air_1: "",
  //     vimcerts_air_1: "",
  //   }),
  auto_station_info_block_2: z
    .object({
      stationLocation_2: z.string().min(1, "Nhập vị trí trạm"),
      stationGPS_2: z.string().min(1, "Nhập tọa độ"),
      siteMap_2: z.any().optional().nullable(),
      dataAcqFrequency_2: z.string().min(1, "Nhập tần suất"),
      sourceDescription_2: z.string().min(1, "Nhập mô tả nguồn thải"),
      parameterCatalog_2: z.string().min(1, "Nhập danh mục thông số"),
      calibrationInfo_2: z.string().min(1, "Nhập thông tin hiệu chuẩn"),
      systemIncidents_2: z.string().min(1, "Nhập sự cố"),
      downtime_2: z.string().min(1, "Nhập thời gian dừng"),
    })
    .default({
      stationLocation_2: "",
      stationGPS_2: "",
      siteMap_2: null,
      dataAcqFrequency_2: "",
      sourceDescription_2: "",
      parameterCatalog_2: "",
      calibrationInfo_2: "",
      systemIncidents_2: "",
      downtime_2: "",
    }),
  air_summary_block_after_2_4: z
    .object({
      avg1hCalc: z.string().min(1, "Nhập mô tả"),
      avg1hCompareQcvn: z.string().min(1, "Nhập so sánh"),
      abnormalExplain: z.string().min(1, "Nhập lý giải"),
      exceedDaysStats: z.string().min(1, "Nhập thống kê"),
      dataCompletenessAssessment_2: z.string().min(1, "Nhập nhận định"),
      exceedParamsAndTime_2: z.string().min(1, "Nhập thông số & thời gian"),
    })
    .default({
      avg1hCalc: "",
      avg1hCompareQcvn: "",
      abnormalExplain: "",
      exceedDaysStats: "",
      dataCompletenessAssessment_2: "",
      exceedParamsAndTime_2: "",
    }),
  // env_incident_prevention_6x: z
  //   .object({
  //     planPrevention: z.string().min(1, "Nhập nội dung 6.1"),
  //     measuresAtSite: z.string().min(1, "Nhập nội dung 6.2"),
  //     responseActions: z.string().min(1, "Nhập nội dung 6.3"),
  //   })
  //   .default({
  //     planPrevention: "",
  //     measuresAtSite: "",
  //     responseActions: "",
  //   }),
  // New tables 3.x, 4.x, 7.x
  // moved to step4: table_3_2_ctrcntt

  // moved to step4: table_3_3_ctrcntt_reuse

  // moved to step4: table_3_4_ctrtt_other

  // moved to step4: table_4_1_ctnh

  // moved to step4: table_4_2a_ctnh_export

  // moved to step4: table_4_3b_ctnh_self_treat

  // moved to step4: table_7_1_inventory

  // Khối chi tiết sau Bảng 1.5 (di chuyển từ Step 2)
  air_summary_block_after_1_5_details: z
    .object({
      treatmentChanges_1: z.string().min(1, "Nhập thay đổi"),
      monitoringTime_air_1: DateString,
      monitoringLocations_air_1: z.string().min(1, "Nhập vị trí"),
      totalEmissionYear_m3_1: z.number().min(0, ">= 0"),
      totalEmissionLastYear_m3_1: z.number().min(0, ">= 0"),
      frequency_air_1: z.string().min(1, "Chọn tần suất"),
      totalSamples_air_1: z.number().min(0, ">= 0"),
      techStandard_air_1: z.string().min(1, "Nhập QCVN"),
      monitoringUnit_air_1: z.string().min(1, "Nhập đơn vị"),
      vimcerts_air_1: z.string().min(1, "Nhập Vimcerts"),
    })
    .default({
      treatmentChanges_1: "",
      monitoringTime_air_1: "",
      monitoringLocations_air_1: "",
      totalEmissionYear_m3_1: 0,
      totalEmissionLastYear_m3_1: 0,
      frequency_air_1: "",
      totalSamples_air_1: 0,
      techStandard_air_1: "",
      monitoringUnit_air_1: "",
      vimcerts_air_1: "",
    }),
});

export type Step3 = z.infer<typeof Step3Schema>;

