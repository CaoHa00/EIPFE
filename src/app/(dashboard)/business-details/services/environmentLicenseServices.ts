// /services/environmentalLicenseServices.ts
import { api, apiWithFile } from "@/lib/axios";
import {
  EnvironmentFormPayload,
  OtherLicense,
  PrimaryLicense,
} from "../types/environmentLicense";

/**
 * Env Permit endpoints (from XLSX)
 * - POST   /api/v1/permits/envpermits           -> create env permit (multipart optional file)
 * - GET    /api/v1/permits/envpermits           -> get env permit by userAccountId (query)
 * - GET    /api/v1/permits/envpermits/exists    -> check existence (query)
 * - PUT    /api/v1/permits/envpermits           -> update (multipart optional file)
 * - DELETE /api/v1/permits/envpermits           -> delete (query)
 *
 * File-specific:
 * - POST   /api/v1/permits/envpermits/file      -> upload/replace file
 * - DELETE /api/v1/permits/envpermits/file      -> delete file
 * - GET    /api/v1/permits/envpermits/file/download -> download file
 * - GET    /api/v1/permits/envpermits/file/exists   -> check file exists
 *
 * Component endpoints:
 * - POST   /api/v1/permits/component            -> create single component permit
 * - POST   /api/v1/permits/component/bulk       -> create many component permits (supports files when backend enables)
 * - GET    /api/v1/permits/component/{permitId} -> get component by id
 * - GET    /api/v1/permits/component            -> list user's components (query userAccountId)
 * - GET    /api/v1/permits/component/type/{permitType} -> components by type (query userAccountId)
 * - GET    /api/v1/permits/component/active     -> active components for user (query userAccountId)
 */

/* -------------------------
   EnvPermit (primary) APIs
   ------------------------- */

export async function createEnvPermit(
  payload: EnvironmentFormPayload
): Promise<any> {
  // Expect payload.primaryLicense etc.
  const hasFiles =
    (payload.primaryLicense &&
      (payload.primaryLicense as any).file instanceof File) ||
    (payload.otherLicenses &&
      payload.otherLicenses.some((l: any) => l.file instanceof File));

  // POST /api/v1/permits/envpermits
  if (hasFiles) {
    // send as multipart
    const form = new FormData();
    form.append("hasLicense", String(payload.hasLicense));
    if (payload.userAccountId)
      form.append("userAccountId", payload.userAccountId);

    if (payload.primaryLicense) {
      form.append(
        "primary[licenseNumber]",
        (payload.primaryLicense as any).licenseNumber ?? ""
      );
      form.append(
        "primary[issueDate]",
        (payload.primaryLicense as any).issueDate ?? ""
      );
      form.append(
        "primary[issuer]",
        (payload.primaryLicense as any).issuer ?? ""
      );
      const f = (payload.primaryLicense as any).file;
      if (f instanceof File) form.append("primary[file]", f);
    }

    // If otherLicenses present we append them too (backend said they will support files soon)
    if (payload.otherLicenses && payload.otherLicenses.length) {
      payload.otherLicenses.forEach((lic: any, idx: number) => {
        form.append(`others[${idx}][licenseType]`, lic.licenseType ?? "");
        form.append(`others[${idx}][projectName]`, lic.projectName ?? "");
        form.append(`others[${idx}][licenseNumber]`, lic.licenseNumber ?? "");
        form.append(`others[${idx}][issueDate]`, lic.issueDate ?? "");
        form.append(`others[${idx}][issuer]`, lic.issuer ?? "");
        if (lic.file instanceof File)
          form.append(`others[${idx}][file]`, lic.file);
      });
    }

    const res = await apiWithFile.post("/permits/envpermits", {
      body: form,
    });
    return res.data;
  } else {
    // JSON body (no files)
    const res = await api.post("/permits/envpermits", {
      body: JSON.stringify(payload),
    });
    return res.data;
  }
}

export async function getEnvPermit(userAccountId: string) {
  const res = await api.get(
    `/permits/envpermits?userAccountId=${encodeURIComponent(userAccountId)}`
  );
  return res.data;
}

export async function envPermitExists(userAccountId: string) {
  const res = await api.get(
    `/permits/envpermits/exists?userAccountId=${encodeURIComponent(
      userAccountId
    )}`
  );
  return res.data;
}

export async function updateEnvPermit(payload: EnvironmentFormPayload) {
  const hasFiles =
    (payload.primaryLicense &&
      (payload.primaryLicense as any).file instanceof File) ||
    (payload.otherLicenses &&
      payload.otherLicenses.some((l: any) => l.file instanceof File));

  if (hasFiles) {
    const form = new FormData();
    form.append("hasLicense", String(payload.hasLicense));
    if (payload.userAccountId)
      form.append("userAccountId", payload.userAccountId);

    if (payload.primaryLicense) {
      form.append(
        "primary[licenseNumber]",
        (payload.primaryLicense as any).licenseNumber ?? ""
      );
      form.append(
        "primary[issueDate]",
        (payload.primaryLicense as any).issueDate ?? ""
      );
      form.append(
        "primary[issuer]",
        (payload.primaryLicense as any).issuer ?? ""
      );
      if ((payload.primaryLicense as any).file instanceof File) {
        form.append("primary[file]", (payload.primaryLicense as any).file);
      }
    }

    if (payload.otherLicenses && payload.otherLicenses.length) {
      payload.otherLicenses.forEach((lic: any, idx: number) => {
        form.append(`others[${idx}][licenseType]`, lic.licenseType ?? "");
        form.append(`others[${idx}][projectName]`, lic.projectName ?? "");
        form.append(`others[${idx}][licenseNumber]`, lic.licenseNumber ?? "");
        form.append(`others[${idx}][issueDate]`, lic.issueDate ?? "");
        form.append(`others[${idx}][issuer]`, lic.issuer ?? "");
        if (lic.file instanceof File)
          form.append(`others[${idx}][file]`, lic.file);
      });
    }

    const res = await apiWithFile.put("/permits/envpermits", {
      body: form,
    });
    return res.data;
  } else {
    const res = await api.put("/permits/envpermits", {
      body: JSON.stringify(payload),
    });
    return res.data;
  }
}

export async function deleteEnvPermit(userAccountId: string) {
  const res = await api.delete(
    `/permits/envpermits?userAccountId=${encodeURIComponent(userAccountId)}`
  );
  return res.data;
}

/* file endpoints */
export async function uploadEnvPermitFile(userAccountId: string, file: File) {
  const form = new FormData();
  form.append("userAccountId", userAccountId);
  form.append("file", file);
  const res = await apiWithFile.post("/permits/envpermits/file", {
    body: form,
  });
  return res.data;
}

export async function deleteEnvPermitFile(userAccountId: string) {
  const res = await apiWithFile.delete(
    `/permits/envpermits/file?userAccountId=${encodeURIComponent(
      userAccountId
    )}`
  );
  return res.data;
}

export async function downloadEnvPermitFile(userAccountId: string) {
  // returns blob - your axios wrapper may need responseType: 'blob'
  const res = await apiWithFile.get(
    `/permits/envpermits/file/download?userAccountId=${encodeURIComponent(
      userAccountId
    )}`,
    { responseType: "blob" }
  );
  return res.data;
}

export async function envPermitFileExists(userAccountId: string) {
  const res = await api.get(
    `/permits/envpermits/file/exists?userAccountId=${encodeURIComponent(
      userAccountId
    )}`
  );
  return res.data;
}

/* -------------------------
   Component permit APIs
   ------------------------- */

export async function createComponentPermit(
  payload: Partial<OtherLicense> & { userAccountId?: string }
) {
  // single create - if file present use multipart
  const hasFile = payload.file instanceof File;
  if (hasFile) {
    const form = new FormData();
    if (payload.userAccountId)
      form.append("userAccountId", payload.userAccountId);
    form.append("licenseType", payload.licenseType ?? "");
    form.append("projectName", payload.projectName ?? "");
    form.append("licenseNumber", payload.licenseNumber ?? "");
    form.append("issueDate", payload.issueDate ?? "");
    form.append("issuer", payload.issuer ?? "");
    if (payload.file instanceof File) form.append("file", payload.file);
    const res = await apiWithFile.post("/permits/component", {
      body: form,
    });
    return res.data;
  } else {
    const res = await api.post("/permits/component", {
      body: JSON.stringify(payload),
    });
    return res.data;
  }
}

export async function createComponentPermitsBulk(
  payloads: (Partial<OtherLicense> & { userAccountId?: string })[]
) {
  // backend said /component/bulk will accept file per item in the future.
  // We'll send multipart FormData with indexed keys 'components[0][licenseType]', 'components[0][file]' etc.
  // If no files present we send JSON array.
  const hasFiles = payloads.some((p) => p.file instanceof File);
  if (hasFiles) {
    const form = new FormData();
    payloads.forEach((p, idx) => {
      form.append(`components[${idx}][licenseType]`, p.licenseType ?? "");
      form.append(`components[${idx}][projectName]`, p.projectName ?? "");
      form.append(`components[${idx}][licenseNumber]`, p.licenseNumber ?? "");
      form.append(`components[${idx}][issueDate]`, p.issueDate ?? "");
      form.append(`components[${idx}][issuer]`, p.issuer ?? "");
      if (p.userAccountId)
        form.append(`components[${idx}][userAccountId]`, p.userAccountId);
      if (p.file instanceof File)
        form.append(`components[${idx}][file]`, p.file);
    });
    const res = await apiWithFile.post("/permits/component/bulk", {
      body: form,
    });
    return res.data;
  } else {
    const res = await api.post("/permits/component/bulk", {
      body: JSON.stringify({ components: payloads }),
    });
    return res.data;
  }
}

export async function getComponentById(permitId: string) {
  const res = await api.get(
    `/permits/component/${encodeURIComponent(permitId)}`
  );
  return res.data;
}

export async function listComponents(userAccountId: string) {
  const res = await api.get(
    `/permits/component?userAccountId=${encodeURIComponent(userAccountId)}`
  );
  return res.data;
}

export async function listComponentsByType(
  userAccountId: string,
  permitType: string
) {
  const res = await api.get(
    `/permits/component/type/${encodeURIComponent(
      permitType
    )}?userAccountId=${encodeURIComponent(userAccountId)}`
  );
  return res.data;
}

export async function listActiveComponents(userAccountId: string) {
  const res = await api.get(
    `/permits/component/active?userAccountId=${encodeURIComponent(
      userAccountId
    )}`
  );
  return res.data;
}
