// app/reports/report5A/schemas/Step1Schema.ts
import { z } from "zod";

export const Step1Schema = z.object({
  facilityName: z.string().min(2, "Nhập tên cơ sở"),
  address: z.string().min(3, "Nhập địa chỉ"),
  phone: z
    .string()
    .min(9, "SĐT không hợp lệ")
    .regex(/^(0|\+84)\d{8,10}$/, "SĐT không hợp lệ"),
  representative: z.string().min(2, "Nhập người đại diện"),

  industry: z.string().min(2, "Nhập loại hình SXKD"),
  capacity: z.coerce.number().min(0, "Công suất ≥ 0").nullable(),
  frequency: z.string().min(2, "Nhập tần suất"),

  businessregistrationcertificate: z.string().min(2, "Nhập số GPKD"),
  taxnumber: z.string().regex(/^\d{8,14}$/, "Mã số thuế không hợp lệ"),

  // File để optional (validate size/type thủ công nếu cần)
  envPermit: z.any().optional().nullable(),
  iso14001: z.any().optional().nullable(),

  productQty: z.string().min(2, "Nhập khối lượng sản phẩm"),
  utilities: z.string().min(2, "Nhập tiêu thụ điện/nước/nhiên liệu"),
});

export type Step1 = z.infer<typeof Step1Schema>;
