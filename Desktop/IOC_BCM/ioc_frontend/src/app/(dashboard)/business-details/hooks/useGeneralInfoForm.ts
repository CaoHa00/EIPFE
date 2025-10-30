"use client";

import { useState } from "react";
import {
  GeneralInformation,
  GeneralInformationResponse,
} from "../types/businessDetails";
import { submitGeneralInformation } from "../services/businessDetailsServices";
import { useAuth } from "@/app/context/auth-context";
import { ApiResponse } from "@/types/api";

export function useGeneralInfoForm() {
  const { user } = useAuth();
  const userAccountId = user?.id ?? "";

  const [form, setForm] = useState<GeneralInformation>({
    companyName: "",
    legalPresentative: "",
    phoneNumber: "",
    location: "",
    industrySector: "",
    scaleCapacity: "",
    businessRegistrationNumber: "",
    taxCode: "",
    operatingFrequency: "regular",
    seasonalPeriod: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof GeneralInformation, string>>
  >({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: typeof errors = {};

    // required checks
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.location.trim()) e.location = "Address is required";
    if (!form.phoneNumber.trim()) e.phoneNumber = "Phone number is required";
    if (!/^[0-9+()\-\s]{6,20}$/.test(form.phoneNumber)) {
      e.phoneNumber = "Invalid phone number";
    }

    if (!form.legalPresentative.trim())
      e.legalPresentative = "Representative is required";
    if (!form.industrySector.trim())
      e.industrySector = "Industry sector is required";
    if (!form.scaleCapacity.trim())
      e.scaleCapacity = "Scale/Capacity is required";
    if (!form.businessRegistrationNumber.trim())
      e.businessRegistrationNumber = "Registration number is required";

    // tax code: must be numeric and length 10 or 13
    const taxDigits = (form.taxCode || "").trim();
    if (!taxDigits) {
      e.taxCode = "Tax code is required";
    } else if (!/^\d{10}$/.test(taxDigits) && !/^\d{13}$/.test(taxDigits)) {
      e.taxCode = "Tax code must be 10 or 13 digits";
    }

    // operatingFrequency required
    if (!form.operatingFrequency)
      e.operatingFrequency = "Operating frequency is required";

    // seasonalPeriod is intentionally optional (no validation required)

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key: keyof GeneralInformation, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setMessage(null);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setMessage(null);

    try {
      const result = await submitGeneralInformation({ ...form, userAccountId });
      if (result.code !== 200) {
        throw new Error(result.message || "Submission failed");
      }
      setMessage({ type: "success", text: result.message });
      return result as ApiResponse<GeneralInformationResponse>;
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      companyName: "",
      legalPresentative: "",
      phoneNumber: "",
      location: "",
      industrySector: "",
      scaleCapacity: "",
      businessRegistrationNumber: "",
      taxCode: "",
      operatingFrequency: "regular",
      seasonalPeriod: "",
    });
    setErrors({});
    setMessage(null);
  };

  return {
    form,
    errors,
    message,
    submitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
