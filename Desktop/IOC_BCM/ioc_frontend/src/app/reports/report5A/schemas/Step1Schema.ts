import { z } from "zod";

// Enum tần suất hoạt động
const OperatingFrequency = z.enum(["Thường xuyên", "Theo mùa"] as const);

// Helper: chấp nhận NaN từ NumberInput (khi ô trống) và báo lỗi thân thiện
const NonNegNumber = z.preprocess(
  (v) => (typeof v === "number" && Number.isNaN(v) ? undefined : v),
  z.number({ invalid_type_error: "Vui lòng nhập số hợp lệ" }).min(0, ">= 0")
);

export const Step1Schema = z
  .object({
    facility_name: z.string().min(1, "Nhập tên cơ sở").max(255),
    address: z.string().min(1, "Nhập địa chỉ").max(500),
    phone_number: z
      .string()
      .regex(/^(0|\+84)\d{8,10}$/, "SĐT không hợp lệ")
      .max(20),
    legal_representative: z.string().min(1, "Nhập người đại diện").max(100),

    activity_type: z.string().min(1, "Nhập loại hình hoạt động"),
    scale_capacity: z.string().min(1, "Nhập quy mô/công suất"),
    operating_frequency: OperatingFrequency,
    seasonal_period_note: z.string().optional().nullable(),

    business_license_number: z.string().min(1, "Nhập số GPKD").max(50),
    tax_code: z.string().regex(/^\d{10}(\d{3})?$/, "Mã số thuế 10 hoặc 13 số"),

    // Giấy phép môi trường (nếu có)
    env_permit_number: z.string().optional().nullable(),
    env_permit_issue_date: z.string().optional().nullable(), // YYYY-MM-DD
    env_permit_issuer: z.string().optional().nullable(),
    env_permit_file: z.any().optional().nullable(),

    // Giấy phép môi trường thành phần (nhiều mục)
    component_permits: z
      .array(
        z.object({
          permit_type: z.string().min(1, "Chọn loại giấy phép"),
          project_name: z.string().min(1, "Nhập tên dự án/công trình").max(500),
          permit_number: z.string().min(1, "Nhập số giấy phép").max(100),
          issue_date: z.string().min(1, "Chọn ngày cấp"),
          issuer_org: z.string().min(1, "Nhập cơ quan cấp").max(255),
          permit_file: z.any().optional().nullable(),
        })
      )
      .default([]),

    // ISO 14001 (không bắt buộc)
    iso_14001_certificate: z.any().optional().nullable(),

    // Sản lượng sản phẩm
    product_volume_cy: NonNegNumber,
    product_unit_cy: z.string().min(1, "Chọn/nhập đơn vị").max(50),
    product_volume_py: NonNegNumber,
    product_unit_py: z.string().min(1, "Chọn/nhập đơn vị").max(50),

    // Nhiên liệu tiêu thụ
    fuel_consumption_cy: NonNegNumber,
    fuel_unit_cy: z.string().min(1, "Chọn/nhập đơn vị").max(50),
    fuel_consumption_py: NonNegNumber,
    fuel_unit_py: z.string().min(1, "Chọn/nhập đơn vị").max(50),

    // Điện, nước tiêu thụ
    electricity_consumption_cy: NonNegNumber,
    electricity_consumption_py: NonNegNumber,
    water_consumption_cy: NonNegNumber,
    water_consumption_py: NonNegNumber,
  })
  .superRefine((data, ctx) => {
    if (data.operating_frequency === "Theo mùa") {
      if (!data.seasonal_period_note || data.seasonal_period_note.trim() === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nhập thời gian hoạt động theo mùa", path: ["seasonal_period_note"] });
      }
    }
    if (data.env_permit_number && data.env_permit_number.trim() !== "") {
      if (!data.env_permit_issue_date || data.env_permit_issue_date.trim() === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Chọn ngày cấp (GPMT)", path: ["env_permit_issue_date"] });
      }
      if (!data.env_permit_issuer || data.env_permit_issuer.trim() === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nhập cơ quan cấp (GPMT)", path: ["env_permit_issuer"] });
      }
    }
  });

export type Step1 = z.infer<typeof Step1Schema>;

