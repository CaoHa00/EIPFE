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
import { Step3, Step4, Step5 } from "./steps";


export default function Report5APage() {
  const methods = useForm<Report5AFormInput, any, Report5AForm>({
    resolver: zodResolver(AllSchema),
    mode: "onSubmit",
    defaultValues: {
      step1: {
        facility_name: "",
        address: "",
        phone_number: "",
        legal_representative: "",
        activity_type: "",
        scale_capacity: "",
        operating_frequency: "Thường xuyên",
        seasonal_period_note: "",
        business_license_number: "",
        tax_code: "",
        env_permit_number: "",
        env_permit_issue_date: "",
        env_permit_issuer: "",
        env_permit_file: null,
        component_permits: [],
        iso_14001_certificate: null,
        product_volume_cy: 0,
        product_unit_cy: "Tấn",
        product_volume_py: 0,
        product_unit_py: "Tấn",
        fuel_consumption_cy: 0,
        fuel_unit_cy: "Lít",
        fuel_consumption_py: 0,
        fuel_unit_py: "Lít",
        electricity_consumption_cy: 0,
        electricity_consumption_py: 0,
        water_consumption_cy: 0,
        water_consumption_py: 0,
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
        connection_diagram:"",
        domestic_wastewater: {
          monitoringTime_dom: "",
          frequency_dom: "",
          locations_dom: "",
          totalSamples_dom: null as any,
          techStandard_dom: "",
          monitoringUnit_dom: "",
          vimcerts_dom: "",
        },
        industrial_wastewater: {
          monitoringTime_ind: "",
          frequency_ind: "",
          locations_ind: "",
          totalSamples_ind: null as any,
          techStandard_ind: "",
          monitoringUnit_ind: "",
          vimcerts_ind: "",
        },
        auto_station_info: {
          stationLocation: "",
          stationGPS: "",
          siteMap: null,
          sourceDescription: "",
          dataAcqFrequency: "",
          calibrationInfo: "",
          systemIncidents: "",
          downtime: "",
        },
        air_summary_block_after_1_5: {
          dataCompletenessAssessment_1: "",
          exceedParamsAndTime_1: "",
        },
        auto_exceed_days_summary: "",
        auto_abnormal_reason: "",
        table_1_1_monitoring: [],
        table_1_3_statistics: [],
        table_1_4_incidents: [],
        table_1_5_exceed: [],

      },
      step3: {
        table_2_1_monitoring: [],
        table_2_2_statistics: [],
        table_2_3_incidents: [],
        table_2_4_exceed: [],
                air_summary_block_after_1_5_details: {
          treatmentChanges_1: "",
          monitoringTime_air_1: "",
          monitoringLocations_air_1: "",
          totalEmissionYear_m3_1: null as any,
          totalEmissionLastYear_m3_1: null as any,
          frequency_air_1: "",
          totalSamples_air_1: null as any,
          techStandard_air_1: "",
          monitoringUnit_air_1: "",
          vimcerts_air_1: "",
        },
        auto_station_info_block_2: {
          stationLocation_2: "",
          stationGPS_2: "",
          siteMap_2: null,
          dataAcqFrequency_2: "",
          sourceDescription_2: "",
          parameterCatalog_2: "",
          calibrationInfo_2: "",
          systemIncidents_2: "",
          downtime_2: "",
        },
        air_summary_block_after_2_4: {
          avg1hCalc: "",
          avg1hCompareQcvn: "",
          abnormalExplain: "",
          exceedDaysStats: "",
          dataCompletenessAssessment_2: "",
          exceedParamsAndTime_2: "",
        },
        // env_incident_prevention_6x: {
        //   planPrevention: "",
        //   measuresAtSite: "",
        //   responseActions: "",
        // },
      },
      step4: {
        sw_general_note: "",
        table_3_1_ctrsh: [],
        table_3_2_ctrcntt: [],
        table_3_3_ctrcntt_reuse: [],
        table_3_4_ctrtt_other: [],
        table_4_1_ctnh: [],
        table_4_2a_ctnh_export: [],
        table_4_3b_ctnh_self_treat: [],
        table_7_1_inventory: [],
        incident_plan_development: "",
        incident_prevention_measures: "",
        incident_response_report: "",
      },
      step5: {
        inspection_remedy_report: "",
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
    if (draft) {
      const cur = methods.getValues();
      methods.reset({
        ...cur,
        step1: { ...(cur as any).step1, ...(draft as any).step1 },
        step2: { ...(cur as any).step2, ...(draft as any).step2 },
        step3: { ...(cur as any).step3, ...(draft as any).step3 },
        step4: { ...(cur as any).step4, ...(draft as any).step4 },
        step5: { ...(cur as any).step5, ...(draft as any).step5 },
      } as any);
    }

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
      <form onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log('submit errors', errors))}>        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 />}
        {step === 3 && <Step4 />}
        {step === 4 && <Step5 />}


        {/* {step > 1 && (
          <FormSection title={`Bước ${step + 1}`}>
            <div className="text-gray-600">Nội dung bước {step + 1} đang được triển khai.</div>
          </FormSection>
        )} */}

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
                  console.log(methods.formState.errors);

                  return;
                }
                console.log(methods.formState.errors);

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






