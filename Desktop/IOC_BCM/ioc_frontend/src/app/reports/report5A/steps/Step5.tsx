"use client";
import { useFormContext, useFormState } from "react-hook-form";
import FormSection from "../../components/forms/FormSection";
import FormField from "../../components/forms/FormField";
import GroupRepeater from "../../components/forms/GroupRepeater";
import type { Report5AForm } from "../schemas/AllSchema";
import type { Step5 as Step5Type } from "../schemas/Step5Schema";


export default function Step5() {
    const { watch, setValue, control } = useFormContext<Report5AForm>();
    const { errors } = useFormState({ control });

    const v = watch("step5");
    type Step5Key = keyof Step5Type;
    const err = (path: Step5Key) =>
        (errors as any)?.step5?.[path]?.message as string | undefined;
    return (
        <div>
            <div className="text-2xl font-bold">
                Kết quả khắc phục các yêu cầu của cơ quan thanh tra, kiểm tra
            </div>     
                   <FormField
                kind="textarea"
                label="Kết quả khắc phục các yêu cầu của cơ quan thanh tra, kiểm tra"
                required
                placeholder="..."
                value={v?.inspection_remedy_report ?? ""}
                onChange={(val) =>
                    setValue("step5.inspection_remedy_report", val, { shouldDirty: true, shouldValidate: true })
                }
                error={err("inspection_remedy_report")}
            />
        </div>
    )
}