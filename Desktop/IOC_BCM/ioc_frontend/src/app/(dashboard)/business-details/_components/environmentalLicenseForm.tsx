"use client";

import React from "react";
import { useEnvironmentForm } from "../hooks/useEnvironmentForm";

const permitTypes = [
  "Certificate of Completion of Environmental Protection Works",
  "Certificate of Compliance with Environmental Standards",
  "Certificate of Eligibility for Environmental Protection in Scrap Import",
  "Permit for Hazardous Waste Treatment",
  "Permit for Wastewater Discharge into Water sources",
  "Permit for Wastewater Discharge into Irrigation works",
];

export default function EnvironmentPermitForm() {
  const {
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
  } = useEnvironmentForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          Do you have an environmental license?{" "}
          <span className="text-red-500">*</span>
        </span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="hasLicense"
            checked={hasLicense === true}
            onChange={() => setHasLicense(true)}
            className="h-4 w-4 cursor-pointer"
          />
          <span className="text-sm">Yes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="hasLicense"
            checked={hasLicense === false}
            onChange={() => setHasLicense(false)}
            className="h-4 w-4 cursor-pointer"
          />
          <span className="text-sm">No</span>
        </label>
      </div>

      {hasLicense ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg">
          <div>
            <label className="block">
              <span className="text-sm font-medium">
                License Number <span className="text-red-500">*</span>
              </span>
              <input
                value={primaryLicense.licenseNumber || ""}
                onChange={(e) =>
                  setPrimaryField("licenseNumber", e.target.value)
                }
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                placeholder="License Number"
              />
              {errors["primary.licenseNumber"] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors["primary.licenseNumber"]}
                </p>
              )}
            </label>

            <label className="block mt-3">
              <span className="text-sm font-medium">
                Issue Date <span className="text-red-500">*</span>
              </span>
              <input
                type="date"
                value={primaryLicense.issueDate || ""}
                onChange={(e) => setPrimaryField("issueDate", e.target.value)}
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
              />
              {errors["primary.issueDate"] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors["primary.issueDate"]}
                </p>
              )}
            </label>

            <label className="block mt-3">
              <span className="text-sm font-medium">
                Issuer <span className="text-red-500">*</span>
              </span>
              <input
                value={primaryLicense.issuer || ""}
                onChange={(e) => setPrimaryField("issuer", e.target.value)}
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                placeholder="Issue Agency"
              />
              {errors["primary.issuer"] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors["primary.issuer"]}
                </p>
              )}
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium">
                Digital File (optional)
              </span>
              <input
                type="file"
                onChange={(e) =>
                  setPrimaryField("file", e.target.files?.[0] ?? null)
                }
                className="mt-1 block cursor-pointer border px-3 py-2 bg-white/5 rounded-lg"
                accept=".pdf,.jpg,.png,.jpeg"
              />
            </label>

            {primaryLicense.file && (
              <div className="mt-3 text-sm text-gray-300">
                Selected file: {primaryLicense.file.name} (
                {Math.round(primaryLicense.file.size / 1024)} KB)
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Other Component Licenses</h3>
            <button
              type="button"
              onClick={addOtherLicense}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm"
            >
              Add license
            </button>
          </div>

          {errors["others"] && (
            <p className="text-xs text-red-400">{errors["others"]}</p>
          )}

          <div className="space-y-4">
            {otherLicenses.map((lic, idx) => (
              <div key={lic.id} className="border rounded-lg p-3 bg-white/5">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">License #{idx + 1}</div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => removeOtherLicense(lic.id)}
                      className="text-sm px-2 py-1 rounded border hover:bg-white/5"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm">
                      License Type <span className="text-red-500">*</span>
                    </span>
                    <select
                      value={lic.licenseType}
                      onChange={(e) =>
                        setOtherField(lic.id, "licenseType", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                      required
                    >
                      <option value="">Select permit type</option>
                      {permitTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors[`others.${lic.id}.licenseType`] && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors[`others.${lic.id}.licenseType`]}
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm">
                      Project Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      value={lic.projectName}
                      onChange={(e) =>
                        setOtherField(lic.id, "projectName", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                      placeholder="Project Name"
                    />
                    {errors[`others.${lic.id}.projectName`] && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors[`others.${lic.id}.projectName`]}
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm">
                      License Number <span className="text-red-500">*</span>
                    </span>
                    <input
                      value={lic.licenseNumber}
                      onChange={(e) =>
                        setOtherField(lic.id, "licenseNumber", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                      placeholder="License Number"
                    />
                    {errors[`others.${lic.id}.licenseNumber`] && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors[`others.${lic.id}.licenseNumber`]}
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm">
                      Issue Date <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="date"
                      value={lic.issueDate}
                      onChange={(e) =>
                        setOtherField(lic.id, "issueDate", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                    />
                    {errors[`others.${lic.id}.issueDate`] && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors[`others.${lic.id}.issueDate`]}
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm">
                      Issuer <span className="text-red-500">*</span>
                    </span>
                    <input
                      value={lic.issuer}
                      onChange={(e) =>
                        setOtherField(lic.id, "issuer", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                      placeholder="Issue Agency"
                    />
                    {errors[`others.${lic.id}.issuer`] && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors[`others.${lic.id}.issuer`]}
                      </p>
                    )}
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm">Digital File (optional)</span>
                    <input
                      type="file"
                      onChange={(e) =>
                        setOtherField(
                          lic.id,
                          "file",
                          e.target.files?.[0] ?? null
                        )
                      }
                      className="mt-1 block w-full"
                      accept=".pdf,.jpg,.png,.jpeg"
                    />
                    {lic.file && (
                      <div className="mt-2 text-sm text-gray-300">
                        Selected: {lic.file.name}
                      </div>
                    )}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
            submitting
              ? "opacity-60 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Saving..." : "Save Environment Permit"}
        </button>

        <button
          type="button"
          onClick={reset}
          className="px-3 py-2 rounded-lg text-sm border hover:bg-white/5 cursor-pointer"
        >
          Reset
        </button>

        {message && (
          <div
            className={`ml-2 px-3 py-2 rounded text-sm ${
              message.type === "success"
                ? "bg-green-900 text-green-200"
                : "bg-red-900 text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </form>
  );
}
