// "use client";

// import { useEffect, useState } from "react";
// import FormSection from "../components/forms/FormSection";
// import FormField from "../components/forms/FormField";
// import { loadDraft, saveDraft, clearDraft } from "../lib/autosave";

// // ---- State shape cho trang nÃ y
// type Report5A = {
//   facilityName: string;
//   address: string;
//   phone?: string;
//   representative: string;

//   industry: string;
//   capacity: string| number | null;      // number | null Ä‘á»ƒ xoÃ¡ Ä‘Æ°á»£c
//   frequency?: string;


//   businessregistrationcertificate?: string | null;
//   taxnumber?: string | null;

//   envPermit?: File | null;
//   iso14001?: File | null;

//   productQty: string;           // mÃ´ táº£ + Ä‘Æ¡n vá»‹
//   utilities: string;            // nhiÃªn liá»‡u/Ä‘iá»‡n/nÆ°á»›c...
// };

// const EMPTY: Report5A = {
//   facilityName: "",
//   address: "",
//   phone: "",
//   representative: "",

//   industry: "",
//   capacity: null,
//   frequency: "",
//   businessregistrationcertificate: "",
//   taxnumber: "",

//   envPermit: null,
//   iso14001: null,

//   productQty: "",
//   utilities: "",
// };

// export default function Report5APage() {
//   const [form, setForm] = useState<Report5A>(EMPTY);

//   useEffect(() => {
//     const d = loadDraft<Report5A>("report5A_v1");
//     if (d) setForm(d);
//   }, []);

//   // Autosave debounce 400ms
//   useEffect(() => {
//     const id = setTimeout(() => saveDraft(form, "report5A_v1"), 400);
//     return () => clearTimeout(id);
//   }, [form]);

//   const resetDraft = () => {
//     clearDraft("report5A_v1");
//     setForm(EMPTY);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <FormSection
//         title="Há»“ sÆ¡ cÃ´ng tÃ¡c báº£o vá»‡ mÃ´i trÆ°á»ng â€“ Report 5A"
//       // desc="LÆ°u Ã½: file JPG/PDF â‰¤ 2MB. CÃ¡c trÆ°á»ng * lÃ  báº¯t buá»™c."
//       >
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="TÃªn CÆ¡ Sá»Ÿ *"
//               required
//               placeholder="Nháº­p tÃªn cÆ¡ sá»Ÿ (VD: CÃ´ng ty TNHH ABC)"
//               value={form.facilityName}
//               onChange={(v) => setForm(f => ({ ...f, facilityName: v }))}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="Äá»‹a chá»‰ *"
//               required
//               placeholder="Nháº­p Ä‘á»‹a chá»‰ (VD: Sá»‘ 123, ÄÆ°á»ng A, TP. Thá»§ Dáº§u Má»™t)"
//               value={form.address}
//               onChange={(v) => setForm(f => ({ ...f, address: v }))}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="Sá»‘ Äiá»‡n Thoáº¡i *"
//               required
//               placeholder="Nháº­p sá»‘ Ä‘iá»‡n thoáº¡i (VD: 0909xxxxxx)"
//               value={form.phone ?? ""}
//               onChange={(v) => setForm(f => ({ ...f, phone: v }))}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="NgÆ°á»i Äáº¡i Diá»‡n *"
//               required
//               placeholder="Nháº­p há» tÃªn ngÆ°á»i Ä‘áº¡i diá»‡n (VD: Nguyá»…n VÄƒn A)"
//               value={form.representative}
//               onChange={(v) => setForm(f => ({ ...f, representative: v }))}
//             />
//           </div>

//           {/* HÃ ng 2 */}
//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="Loáº¡i HÃ¬nh Sáº£n Xuáº¥t/Kinh Doanh *"
//               required
//               placeholder="VD: Sáº£n xuáº¥t nÆ°á»›c giáº£i khÃ¡t / Gia cÃ´ng cÆ¡ khÃ­..."
//               value={form.industry}
//               onChange={(v) => setForm(f => ({ ...f, industry: v }))}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <FormField
//               kind="number"
//               label="Quy MÃ´ / CÃ´ng Suáº¥t *"
//               required
//               value={form.capacity?? undefined} 
//               onChange={(v) => setForm(f => ({ ...f, capacity: v }))}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="Táº§n Suáº¥t Hoáº¡t Äá»™ng *"
//               required
//               placeholder="VD: 8h/ngÃ y, 5 ngÃ y/tuáº§n"
//               value={form.frequency ?? ""}
//               onChange={(v) => setForm(f => ({ ...f, frequency: v }))}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <div className="h-0 md:h-full" />
//           </div>

//           {/* HÃ ng 3: giáº¥y tá» */}
//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="Giáº¥y ÄK Kinh Doanh *"
//               required
//               placeholder="VD..."
//               value={form.businessregistrationcertificate ?? ""}
//               onChange={(v) => setForm(f => ({ ...f, businessregistrationcertificate: v }))}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <FormField
//               kind="text"
//               label="MÃ£ Sá»‘ Thuáº¿ *"
//               required
//               placeholder="21132...."
//               value={form.taxnumber ?? ""}
//               onChange={(v) => setForm(f => ({ ...f, taxnumber: v }))}
//             />
//           </div>
//           <div className="md:col-span-1">
//             <FormField
//               kind="file"
//               label="Giáº¥y PhÃ©p MÃ´i TrÆ°á»ng"
//               file={form.envPermit ?? null}
//               accept=".pdf,.jpg,.jpeg,.png"
//               note="PDF/JPG/PNG â‰¤ 2MB"
//               onChange={(f) => setForm(d => ({ ...d, envPermit: f }))}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <FormField
//               kind="file"
//               label="Giáº¥y Chá»©ng Nháº­n ISO 14001"
//               file={form.iso14001 ?? null}
//               accept=".pdf,.jpg,.jpeg,.png"
//               note="Náº¿u cÃ³"
//               onChange={(f) => setForm(d => ({ ...d, iso14001: f }))}
//             />
//           </div>


//           {/* HÃ ng 4 */}
//           <div className="md:col-span-2">
//             <FormField
//               kind="text"
//               label="Khá»‘i LÆ°á»£ng Sáº£n Pháº©m Cá»§a NÄƒm BÃ¡o CÃ¡o VÃ  NÄƒm Gáº§n Nháº¥t *"
//               required
//               placeholder="VD: NÄƒm 2024: 100 táº¥n; NÄƒm 2025: 120 táº¥n"
//               value={form.productQty}
//               onChange={(v) => setForm(f => ({ ...f, productQty: v }))}
//             />
//           </div>

//           <div className="md:col-span-2">
//             <FormField
//               kind="text"
//               label="NhiÃªn Liá»‡u, Äiá»‡n, NÆ°á»›c TiÃªu Thá»¥ Cá»§a NÄƒm BÃ¡o CÃ¡o VÃ  NÄƒm Gáº§n Nháº¥t *"
//               required
//               placeholder="VD: Äiá»‡n: 120.000 kWh; NÆ°á»›c: 5.000 mÂ³; Dáº§u: 2.000 lÃ­t"
//               value={form.utilities}
//               onChange={(v) => setForm(f => ({ ...f, utilities: v }))}
//             />
//           </div>
//         </div>

//         {/* Action */}
//         <div className="mt-6 flex gap-3">
//           <button
//             type="button"
//             className="px-4 h-10 rounded-lg border bg-white"
//             onClick={() => saveDraft(form, "report5A_v1")}
//           >
//             LÆ°u nhÃ¡p
//           </button>
//           <button
//             type="button"
//             className="px-4 h-10 rounded-lg border bg-white"
//             onClick={resetDraft}
//           >
//             XoÃ¡ nhÃ¡p
//           </button>
//           <button
//             type="button"
//             className="ml-auto px-4 h-10 rounded-lg bg-blue-600 text-white"
//             onClick={() => alert("Submit mock â€“ cáº¯m API POST /api/reports/report5a")}
//           >
//             Next
//           </button>
//         </div>
//       </FormSection >
//     </div >
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AllSchema, type Report5AForm, type Report5AFormInput } from "./schemas";
import Step1 from "./steps/Step1";
import FormSection from "../components/forms/FormSection";
import { loadDraft, useAutosave } from "../lib/autosave";
import { useRouter, useSearchParams } from "next/navigation";

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
    },
  });

  // Wizard step state + URL sync
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalSteps = 5;
  const [step, setStep] = useState(() => {
    const s = Number(searchParams.get("step") ?? "0");
    return Number.isFinite(s) ? Math.max(0, Math.min(totalSteps - 1, s)) : 0;
  });
  // Restore draft once on mount
  useEffect(() => {
    const draft = loadDraft<Report5AFormInput>("report5A_wizard_v1");
    if (draft) {
      methods.reset(draft as Report5AFormInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave when form values change (debounced inside hook)
  const values = useWatch<Report5AFormInput>({ control: methods.control });
  const { trigger: triggerAutosave } = useAutosave<Report5AFormInput>(
    "report5A_wizard_v1",
    values
  );
  useEffect(() => {
    triggerAutosave();
  }, [values, triggerAutosave]);

  const onSubmit = (data: Report5AForm) => {
    console.log("Report5A submit", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6">
        {step === 0 ? (
          <Step1 />
        ) : (
          <FormSection title={`BÆ°á»›c ${step + 1}`}>
            <div className="text-gray-600">Ná»™i dung bÆ°á»›c {step + 1} Ä‘ang Ä‘Æ°á»£c triá»ƒn khai.</div>
          </FormSection>
        )}

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              className="px-4 h-10 rounded-lg border bg-white"
            <button type="submit" className="ml-auto px-4 h-10 rounded-lg bg-green-600 text-white">
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

