// import { z } from "zod";
// import { Step1Schema } from "./Step1Schema";
// // import { Step2Schema } from "./Step2Schema";
// // import { Step3Schema } from "./Step3Schema";
// // import { Step4Schema } from "./Step4Schema";
// // import { Step5Schema } from "./Step5Schema";

// export const AllSchema = z.object({
//   step1: Step1Schema,
// //   step2: Step2Schema,
// //   step3: Step3Schema,
// //   step4: Step4Schema,
// //   step5: Step5Schema,
// });
// export type Report5AForm = z.infer<typeof AllSchema>;

// // Schema cho từng step để validate khi Next
// export const StepSchemas = [
//   z.object({ step1: Step1Schema }),
// //   z.object({ step2: Step2Schema }),
// //   z.object({ step3: Step3Schema }),
// //   z.object({ step4: Step4Schema }),
// //   z.object({ step5: Step5Schema }),
// ] as const;
import { z } from "zod";
import { Step1Schema } from "./Step1Schema";
import { Step2Schema } from "./Step2Schema";

export const AllSchema = z.object({
  step1: Step1Schema,
  step2: Step2Schema,
});
export type Report5AForm = z.infer<typeof AllSchema>;
export type Report5AFormInput = z.input<typeof AllSchema>;

export const StepSchemas = [
  z.object({ step1: Step1Schema }),
  z.object({ step2: Step2Schema }),
] as const;
