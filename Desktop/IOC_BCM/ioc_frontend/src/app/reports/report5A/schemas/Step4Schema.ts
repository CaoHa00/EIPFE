import { z } from "zod";

const DateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày không hợp lệ (YYYY-MM-DD)");

export const Step4Schema = z.object({
  // General note for solid waste
  sw_general_note: z.string().optional().nullable(),
  // 3.1 CTRSH (moved from step3)
  table_3_1_ctrsh: z
    .array(
      z.object({
        ctrshName: z.string().min(1, "NhADp tAAn CTRSH"),
        reportWeight: z.number().min(0, ">= 0"),
        receiverOrganization: z.string().min(1, "NhADp 11A1n vBB tiBFp nhADn"),
        lastYearWeight: z.number().min(0, ">= 0"),
      })
    )
    .default([]),
  // 3.2 CTRCNTT
  table_3_2_ctrcntt: z
    .array(
      z.object({
        groupName: z.string().min(1, "Nhập nhóm CTRCNTT"),
        reportWeightKg: z.number().min(0, ">= 0"),
        receiverOrganization: z.string().min(1, "Nhập đơn vị tiếp nhận"),
        lastYearWeightKg: z.number().min(0, ">= 0"),
      })
    )
    .default([]),

  // 3.3 CTRCNTT tái sử dụng/tái chế
  table_3_3_ctrcntt_reuse: z
    .array(
      z.object({
        transferor: z.string().min(1, "Nhập đơn vị chuyển giao"),
        reportAmountKg: z.number().min(0, ">= 0"),
        wasteType: z.string().min(1, "Nhập chủng loại"),
        lastYearAmountKg: z.number().min(0, ">= 0"),
      })
    )
    .default([]),

  // 3.4 CTRTT khác
  table_3_4_ctrtt_other: z
    .array(
      z.object({
        otherGroupName: z.string().min(1, "Nhập nhóm CTRTT khác"),
        reportWeightKg: z.number().min(0, ">= 0"),
        selfTreatmentMethod: z.string().min(1, "Nhập phương thức"),
        receiverOrganization: z.string().min(1, "Nhập đơn vị tiếp nhận"),
        lastYearWeightKg: z.number().min(0, ">= 0"),
      })
    )
    .default([]),

  // 4.1 CTNH
  table_4_1_ctnh: z
    .array(
      z.object({
        wasteName: z.string().min(1, "Nhập tên CTNH"),
        ctnhCode: z.string().min(1, "Nhập mã CTNH"),
        reportAmountKg: z.number().min(0, ">= 0"),
        treatmentMethod: z.string().min(1, "Chọn phương pháp"),
        lastYearAmountKg: z.number().min(0, ">= 0"),
        receiverOrganization: z.string().min(1, "Nhập đơn vị tiếp nhận"),
      })
    )
    .default([]),

  // 4.2a CTNH xuất khẩu
  table_4_2a_ctnh_export: z
    .array(
      z.object({
        wasteName: z.string().min(1, "Nhập tên CTNH"),
        ctnhCode: z.string().min(1, "Nhập mã CTNH"),
        baselCode: z.string().min(1, "Nhập mã Basel"),
        lastYearAmountKg: z.number().min(0, ">= 0"),
        crossBorderCarrier: z.string().min(1, "Nhập đơn vị vận chuyển"),
        foreignProcessor: z.string().min(1, "Nhập đơn vị xử lý"),
      })
    )
    .default([]),

  // 4.3b CTNH tự xử lý
  table_4_3b_ctnh_self_treat: z
    .array(
      z.object({
        wasteName: z.string().min(1, "Nhập tên CTNH"),
        ctnhCode: z.string().min(1, "Nhập mã CTNH"),
        amountKg: z.number().min(0, ">= 0"),
        selfReuseProcess: z.string().min(1, "Nhập phương thức"),
      })
    )
    .default([]),

  // 7.1 Inventory
  table_7_1_inventory: z
    .array(
      z.object({
        pollutantName: z.string().min(1, "Nhập tên chất ô nhiễm"),
        casNumber: z.string().min(1, "Nhập mã CAS"),
        importTime: DateString,
        importWeightKg: z.number().min(0, ">= 0"),
        concentration: z.string().min(1, "Nhập nồng độ"),
        usedWeightKg: z.number().min(0, ">= 0"),
        storedWeightKg: z.number().min(0, ">= 0"),
        complianceAssessment: z.string().min(1, "Nhập đánh giá"),
      })
    )
    .default([]),

  // 7.2 (chưa có đặc tả) – sẽ bổ sung sau khi có cấu trúc
  // table_7_2: z.array(z.any()).default([]),

  // 6.x Phong ngua, ung pho su co (bat buoc nhap)
  incident_plan_development: z.string().min(1, "Bat buoc nhap (6.1)"),
  incident_prevention_measures: z.string().min(1, "Bat buoc nhap (6.2)"),
  incident_response_report: z.string().min(1, "Bat buoc nhap (6.3)"),
});

export type Step4 = z.infer<typeof Step4Schema>;
