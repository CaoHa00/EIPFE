"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch, DeepPartial } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AllSchema, type Report5AForm, type Report5AFormInput } from "./schemas";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import FormSection from "../components/forms/FormSection";
import { loadDraft, useAutosave } from "../lib/autosave";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Report5APage() {
  const methods = useForm<Report5AFormInput, any, Report5AForm>({
    resolver: zodResolver(AllSchema),
    mode: "onChange",
    defaultValues: {
      step1: {
        facilityName: "",
        address: "",
        phone: "",
        representative: "",
        industry: "",
        capacity: null,
        frequency: "",
        businessregistrationcertificate: "",
        taxnumber: "",
        envPermit: null,
        iso14001: null,
        productQty: "",
        utilities: "",
      },
      step2: {
        congTrinhXuLyNuocThai: "",
        sinhHoat_baoCao: null as any,
        sinhHoat_ganNhat: null as any,
        sinhHoat_thietKe: null as any,
        congNghiep_baoCao: null as any,
        congNghiep_ganNhat: null as any,
        congNghiep_thietKe: null as any,
        lamMat_baoCao: null as any,
        lamMat_ganNhat: null as any,
        lamMat_thietKe: null as any,
        tinhHinhDauNoiXLNT: "",
      },
    },
  });

  // Wizard step state + URL sync
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const totalSteps = 5;
  const [step, setStep] = useState(() => {
    const s = Number(searchParams.get("step") ?? "0");
    return Number.isFinite(s) ? Math.max(0, Math.min(totalSteps - 1, s)) : 0;
  });

  // Restore draft once on mount
  useEffect(() => {
    const draft = loadDraft<DeepPartial<Report5AFormInput>>("report5A_wizard_v1");
    if (draft) methods.reset({ ...methods.getValues(), ...draft });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave when form values change (debounced inside hook)
  const values = useWatch<Report5AFormInput>({ control: methods.control });
  const { trigger: triggerAutosave } = useAutosave<DeepPartial<Report5AFormInput>>("report5A_wizard_v1", values);
  useEffect(() => {
    triggerAutosave();
  }, [values, triggerAutosave]);

  const onSubmit = (data: Report5AForm) => {
    console.log("Report5A submit", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6">
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step > 1 && (
          <FormSection title={`Bước ${step + 1}`}>
            <div className="text-gray-600">Nội dung bước {step + 1} đang được triển khai.</div>
          </FormSection>
        )}

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              className="px-4 h-10 rounded-lg border bg-white"
              onClick={() => {
                const next = Math.max(0, step - 1);
                setStep(next);
                router.replace(`${pathname}?step=${next}`);
              }}
            >
              Back
            </button>
          )}

          {step < totalSteps - 1 ? (
            <button
              type="button"
              className="ml-auto px-4 h-10 rounded-lg bg-blue-600 text-white"
              onClick={async () => {
                const stepPaths = ["step1", "step2", "step3", "step4", "step5"] as const;
                const currentPath = stepPaths[step] as any;
                const isValid = await methods.trigger(currentPath, { shouldFocus: true });
                if (!isValid) {
                  return;
                }
                const next = Math.min(totalSteps - 1, step + 1);
                setStep(next);
                router.replace(`${pathname}?step=${next}`);
              }}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="ml-auto px-4 h-10 rounded-lg bg-green-600 text-white">
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
