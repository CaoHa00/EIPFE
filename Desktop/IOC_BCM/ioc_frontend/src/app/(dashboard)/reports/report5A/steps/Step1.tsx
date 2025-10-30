// "use client";

// import { useFormContext, useFormState } from "react-hook-form";
// import FormSection from "../../components/forms/FormSection";
// import FormField from "../../components/forms/FormField";
// import type { Report5AForm } from "../schemas/AllSchema";
// import type { Step1 as Step1Type } from "../schemas/Step1Schema";

// export default function Step1() {
//     const { watch, setValue, control } = useFormContext<Report5AForm>();
//     const { errors } = useFormState({ control });

//     const v = watch("step1");
//     type Step1Key = keyof Step1Type;
//     const err = (path: Step1Key) =>
//         (errors as any)?.step1?.[path]?.message as string | undefined;

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <FormSection title="Há»“ sÆ¡ cÃ´ng tÃ¡c báº£o vá»‡ mÃ´i trÆ°á»ng â€“ Report 5A (Step 1)">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="TÃªn CÆ¡ Sá»Ÿ *"
//                             required
//                             placeholder="CÃ´ng ty TNHH ABC"
//                             value={v?.facilityName ?? ""}
//                             onChange={(val) => setValue("step1.facilityName", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("facilityName")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="Äá»‹a chá»‰ *"
//                             required
//                             placeholder="Sá»‘ 123, ÄÆ°á»ng A, TP..."
//                             value={v?.address ?? ""}
//                             onChange={(val) => setValue("step1.address", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("address")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="Sá»‘ Äiá»‡n Thoáº¡i *"
//                             required
//                             placeholder="0909xxxxxx"
//                             value={v?.phone ?? ""}
//                             onChange={(val) => setValue("step1.phone", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("phone")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="NgÆ°á»i Äáº¡i Diá»‡n *"
//                             required
//                             placeholder="Nguyá»…n VÄƒn A"
//                             value={v?.representative ?? ""}
//                             onChange={(val) => setValue("step1.representative", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("representative")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="Loáº¡i HÃ¬nh SXKD *"
//                             required
//                             placeholder="NÆ°á»›c giáº£i khÃ¡t / Gia cÃ´ng cÆ¡ khÃ­â€¦"
//                             value={v?.industry ?? ""}
//                             onChange={(val) => setValue("step1.industry", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("industry")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="number"
//                             label="Quy MÃ´ / CÃ´ng Suáº¥t *"
//                             required
//                             value={v?.capacity !== null ? v?.capacity : ""}
//                             onChange={(val) => setValue("step1.capacity", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("capacity")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="Táº§n Suáº¥t Hoáº¡t Äá»™ng *"
//                             required
//                             placeholder="8h/ngÃ y, 5 ngÃ y/tuáº§n"
//                             value={v?.frequency ?? ""}
//                             onChange={(val) => setValue("step1.frequency", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("frequency")}
//                         />
//                     </div>

//                     <div className="md:col-span-1"><div className="h-0 md:h-full" /></div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="Giáº¥y ÄK Kinh Doanh *"
//                             required
//                             value={v?.businessregistrationcertificate ?? ""}
//                             onChange={(val) =>
//                                 setValue("step1.businessregistrationcertificate", val, { shouldDirty: true, shouldValidate: true })
//                             }
//                             error={err("businessregistrationcertificate")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="text"
//                             label="MÃ£ Sá»‘ Thuáº¿ *"
//                             required
//                             placeholder="0123456789"
//                             value={v?.taxnumber ?? ""}
//                             onChange={(val) => setValue("step1.taxnumber", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("taxnumber")}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="file"
//                             label="Giáº¥y PhÃ©p MÃ´i TrÆ°á»ng"
//                             file={v?.envPermit ?? null}
//                             accept=".pdf,.jpg,.jpeg,.png"
//                             note="PDF/JPG/PNG â‰¤ 2MB"
//                             onChange={(file) => setValue("step1.envPermit", file ?? null, { shouldDirty: true, shouldValidate: true })}
//                         />
//                     </div>

//                     <div className="md:col-span-1">
//                         <FormField
//                             kind="file"
//                             label="Giáº¥y Chá»©ng Nháº­n ISO 14001"
//                             file={v?.iso14001 ?? null}
//                             accept=".pdf,.jpg,.jpeg,.png"
//                             note="Náº¿u cÃ³"
//                             onChange={(file) => setValue("step1.iso14001", file ?? null, { shouldDirty: true, shouldValidate: true })}
//                         />
//                     </div>

//                     <div className="md:col-span-2">
//                         <FormField
//                             kind="text"
//                             label="Khá»‘i LÆ°á»£ng Sáº£n Pháº©m (nÄƒm bÃ¡o cÃ¡o & nÄƒm gáº§n nháº¥t) *"
//                             required
//                             placeholder="2024: 100 táº¥n; 2025: 120 táº¥n"
//                             value={v?.productQty ?? ""}
//                             onChange={(val) => setValue("step1.productQty", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("productQty")}
//                         />
//                     </div>

//                     <div className="md:col-span-2">
//                         <FormField
//                             kind="text"
//                             label="NhiÃªn liá»‡u, Äiá»‡n, NÆ°á»›c (nÄƒm bÃ¡o cÃ¡o & nÄƒm gáº§n nháº¥t) *"
//                             required
//                             placeholder="Äiá»‡n: 120.000 kWh; NÆ°á»›c: 5.000 mÂ³; Dáº§u: 2.000 lÃ­t"
//                             value={v?.utilities ?? ""}
//                             onChange={(val) => setValue("step1.utilities", val, { shouldDirty: true, shouldValidate: true })}
//                             error={err("utilities")}
//                         />
//                     </div>
//                 </div>
//             </FormSection>
//         </div>
//     );
// }





"use client";

import { useFormContext, useFormState } from "react-hook-form";
import FormSection from "../../components/forms/FormSection";
import FormField from "../../components/forms/FormField";
import type { Report5AForm } from "../schemas/AllSchema";
import type { Step1 as Step1Type } from "../schemas/Step1Schema";

export default function Step1() {
    const { watch, setValue, control } = useFormContext<Report5AForm>();
    const { errors } = useFormState({ control });

    const v = watch("step1");
    type Step1Key = keyof Step1Type;
    const err = (path: Step1Key) =>
        (errors as any)?.step1?.[path]?.message as string | undefined;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <FormSection title="Hồ sơ công tác bảo vệ môi trường – Report 5A (Step 1)">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Tên cơ sở *"
                            required
                            placeholder="Công ty TNHH ABC"
                            value={v?.facilityName ?? ""}
                            onChange={(val) =>
                                setValue("step1.facilityName", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("facilityName")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Địa chỉ *"
                            required
                            placeholder="Số 123, Đường A, TP.HCM"
                            value={v?.address ?? ""}
                            onChange={(val) =>
                                setValue("step1.address", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("address")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Số điện thoại *"
                            required
                            placeholder="0909xxxxxx"
                            value={v?.phone ?? ""}
                            onChange={(val) =>
                                setValue("step1.phone", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("phone")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Người đại diện *"
                            required
                            placeholder="Nguyễn Văn A"
                            value={v?.representative ?? ""}
                            onChange={(val) =>
                                setValue("step1.representative", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("representative")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Loại hình sản xuất kinh doanh *"
                            required
                            placeholder="Nước giải khát / Gia công cơ khí..."
                            value={v?.industry ?? ""}
                            onChange={(val) =>
                                setValue("step1.industry", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("industry")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="number"
                            label="Quy mô / Công suất *"
                            required
                            value={v?.capacity !== null ? v?.capacity : ""}
                            onChange={(val) =>
                                setValue("step1.capacity", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("capacity")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Tần suất hoạt động *"
                            required
                            placeholder="8h/ngày, 5 ngày/tuần"
                            value={v?.frequency ?? ""}
                            onChange={(val) =>
                                setValue("step1.frequency", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("frequency")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <div className="h-0 md:h-full" />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Giấy đăng ký kinh doanh *"
                            required
                            value={v?.businessregistrationcertificate ?? ""}
                            onChange={(val) =>
                                setValue("step1.businessregistrationcertificate", val, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                            error={err("businessregistrationcertificate")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="text"
                            label="Mã số thuế *"
                            required
                            placeholder="0123456789"
                            value={v?.taxnumber ?? ""}
                            onChange={(val) =>
                                setValue("step1.taxnumber", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("taxnumber")}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="file"
                            label="Giấy phép môi trường"
                            file={v?.envPermit ?? null}
                            accept=".pdf,.jpg,.jpeg,.png"
                            note="PDF/JPG/PNG ≤ 2MB"
                            onChange={(file) =>
                                setValue("step1.envPermit", file ?? null, { shouldDirty: true, shouldValidate: true })
                            }
                        />
                    </div>

                    <div className="md:col-span-1">
                        <FormField
                            kind="file"
                            label="Giấy chứng nhận ISO 14001"
                            file={v?.iso14001 ?? null}
                            accept=".pdf,.jpg,.jpeg,.png"
                            note="Nếu có"
                            onChange={(file) =>
                                setValue("step1.iso14001", file ?? null, { shouldDirty: true, shouldValidate: true })
                            }
                        />
                    </div>

                    <div className="md:col-span-2">
                        <FormField
                            kind="text"
                            label="Khối lượng sản phẩm (năm báo cáo & năm gần nhất) *"
                            required
                            placeholder="2024: 100 tấn; 2025: 120 tấn"
                            value={v?.productQty ?? ""}
                            onChange={(val) =>
                                setValue("step1.productQty", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("productQty")}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <FormField
                            kind="text"
                            label="Nhiên liệu, điện, nước (năm báo cáo & năm gần nhất) *"
                            required
                            placeholder="Điện: 120.000 kWh; Nước: 5.000 m³; Dầu: 2.000 lít"
                            value={v?.utilities ?? ""}
                            onChange={(val) =>
                                setValue("step1.utilities", val, { shouldDirty: true, shouldValidate: true })
                            }
                            error={err("utilities")}
                        />
                    </div>
                </div>
            </FormSection>
        </div>
    );
}
