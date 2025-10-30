import { z } from "zod";

export const Step2Schema = z.object({

  congTrinhXuLyNuocThai: z.string().optional().nullable(),

  // Nước thải sinh hoạt
  sinhHoat_baoCao: z.number().min(0, "Lớn hơn hoặc bằng 0"),
  sinhHoat_ganNhat: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),
  sinhHoat_thietKe: z.number().min(0, "Lớn hơn hoặc bằng 0"),

  // Nước thải công nghiệp
  congNghiep_baoCao: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),
  congNghiep_ganNhat: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),
  congNghiep_thietKe: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),

  // Nước làm mát
  lamMat_baoCao: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),
  lamMat_ganNhat: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),
  lamMat_thietKe: z.number().min(0, "Lớn hơn hoặc bằng 0").nullable().optional(),

  // Tình hình đấu nối
  tinhHinhDauNoiXLNT: z.string().optional().nullable(),
});

export type Step2 = z.infer<typeof Step2Schema>;
