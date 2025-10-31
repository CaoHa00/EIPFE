import { z } from "zod";

export const Step5Schema = z.object({
  inspection_remedy_report: z.string().min(1, "Nhập nội dung báo cáo khắc phục"),
});

export type Step5 = z.infer<typeof Step5Schema>;
