// /hooks/useEnvironmentForm.ts
"use client";

import { useState } from "react";
import {
  EnvironmentFormPayload,
  OtherLicense,
  PrimaryLicense,
} from "../types/environmentLicense";
import {
  createEnvPermit,
  createComponentPermitsBulk,
  // other helpers kept if you need them later
} from "../services/environmentLicenseServices";
import { useAuth } from "@/app/context/auth-context";

function emptyOtherLicense(): OtherLicense {
  return {
    id:
      typeof crypto !== "undefined" &&
      typeof (crypto as any).randomUUID === "function"
        ? (crypto as any).randomUUID()
        : String(Math.random()).slice(2),
    licenseType: "",
    projectName: "",
    licenseNumber: "",
    issueDate: "",
    issuer: "",
    file: undefined,
  };
}

export function useEnvironmentForm() {
  const { user } = useAuth();
  const userAccountId = user?.id ?? "";

  const [hasLicense, setHasLicense] = useState<boolean>(true);
  const [primaryLicense, setPrimaryLicense] = useState<PrimaryLicense>({
    hasLicense: true,
    licenseNumber: "",
    issueDate: "",
    issuer: "",
    file: undefined,
  } as PrimaryLicense);

  const [otherLicenses, setOtherLicenses] = useState<OtherLicense[]>([
    emptyOtherLicense(),
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  function validate(): boolean {
    const e: Record<string, string> = {};

    if (hasLicense) {
      if (!primaryLicense.licenseNumber?.trim())
        e["primary.licenseNumber"] = "License number is required";
      if (!primaryLicense.issueDate?.trim())
        e["primary.issueDate"] = "Issue date is required";
      if (!primaryLicense.issuer?.trim())
        e["primary.issuer"] = "Issuer is required";
    } else {
      if (!otherLicenses.length) {
        e["others"] = "At least one license is required";
      } else {
        otherLicenses.forEach((lic) => {
          const base = `others.${lic.id}`;
          if (!lic.licenseType?.trim())
            e[`${base}.licenseType`] = "License type is required";
          if (!lic.projectName?.trim())
            e[`${base}.projectName`] = "Project name is required";
          if (!lic.licenseNumber?.trim())
            e[`${base}.licenseNumber`] = "License number is required";
          if (!lic.issueDate?.trim())
            e[`${base}.issueDate`] = "Issue date is required";
          if (!lic.issuer?.trim()) e[`${base}.issuer`] = "Issuer is required";
        });
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function setPrimaryField<K extends keyof PrimaryLicense>(
    key: K,
    value: PrimaryLicense[K]
  ) {
    setPrimaryLicense((p) => ({ ...p, [key]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`primary.${String(key)}`];
      return copy;
    });
    setMessage(null);
  }

  function addOtherLicense() {
    setOtherLicenses((s) => [...s, emptyOtherLicense()]);
  }

  function removeOtherLicense(id: string) {
    setOtherLicenses((s) => s.filter((l) => l.id !== id));
    setErrors((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((k) => {
        if (k.startsWith(`others.${id}`)) delete copy[k];
      });
      return copy;
    });
  }

  function setOtherField(id: string, field: keyof OtherLicense, value: any) {
    setOtherLicenses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`others.${id}.${String(field)}`];
      return copy;
    });
    setMessage(null);
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setMessage(null);

    try {
      if (hasLicense) {
        // create env permit (primary)
        const payload: EnvironmentFormPayload = {
          hasLicense,
          userAccountId,
          primaryLicense: {
            licenseNumber: primaryLicense.licenseNumber,
            issueDate: primaryLicense.issueDate,
            issuer: primaryLicense.issuer,
            file: primaryLicense.file,
          } as any,
        };

        const res = await createEnvPermit(payload);
        setMessage({
          type: "success",
          text: res?.message || "Env permit saved successfully",
        });
      } else {
        // create component permits in bulk
        // Map otherLicenses -> payload items; include userAccountId per item (if API expects)
        const payloads = otherLicenses.map((l) => ({
          licenseType: l.licenseType,
          projectName: l.projectName,
          licenseNumber: l.licenseNumber,
          issueDate: l.issueDate,
          issuer: l.issuer,
          file: l.file,
          userAccountId,
        }));

        const res = await createComponentPermitsBulk(payloads);
        setMessage({
          type: "success",
          text: res?.message || "Component permits saved successfully",
        });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Network error" });
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setHasLicense(true);
    setPrimaryLicense({
      hasLicense: true,
      licenseNumber: "",
      issueDate: "",
      issuer: "",
      file: undefined,
    } as PrimaryLicense);
    setOtherLicenses([emptyOtherLicense()]);
    setErrors({});
    setMessage(null);
  }

  return {
    hasLicense,
    setHasLicense,
    primaryLicense,
    setPrimaryField,
    otherLicenses,
    addOtherLicense,
    removeOtherLicense,
    setOtherField,
    errors,
    submitting,
    message,
    handleSubmit,
    reset,
  };
}
