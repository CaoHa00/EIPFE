"use client";

import React from "react";
import { useGeneralInfoForm } from "../hooks/useGeneralInfoForm";

export default function GeneralInformationForm() {
  const {
    form,
    errors,
    message,
    submitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useGeneralInfoForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-5xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {/** Company Name */}
          <label className="block">
            <span className="text-sm font-medium">
              Company Name
              <span className="text-red-500">*</span>
            </span>
            <input
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5 placeholder-gray-400 ${
                errors.companyName ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="Company A"
            />
            {errors.companyName && (
              <p className="text-xs text-red-400 mt-1">{errors.companyName}</p>
            )}
          </label>

          {/** Address */}
          <label className="block">
            <span className="text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </span>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5 placeholder-gray-400 ${
                errors.location ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="Address"
            />
            {errors.location && (
              <p className="text-xs text-red-400 mt-1">{errors.location}</p>
            )}
          </label>

          {/** Industry Sector */}
          <label className="block">
            <span className="text-sm font-medium">
              Industry Sector <span className="text-red-500">*</span>
            </span>
            <textarea
              value={form.industrySector}
              onChange={(e) => handleChange("industrySector", e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
              placeholder="Type of manufacturing activity"
            />
            {errors.industrySector && (
              <p className="text-xs text-red-400 mt-1">
                {errors.industrySector}
              </p>
            )}
          </label>

          {/** Business Registration */}
          <label className="block">
            <span className="text-sm font-medium">
              Business Registration
              <span className="text-red-500">*</span>
            </span>
            <input
              value={form.businessRegistrationNumber}
              onChange={(e) =>
                handleChange("businessRegistrationNumber", e.target.value)
              }
              className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
              placeholder="Registration Number"
            />
            {errors.businessRegistrationNumber && (
              <p className="text-xs text-red-400 mt-1">
                {errors.businessRegistrationNumber}
              </p>
            )}
          </label>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/** Phone */}
          <label className="block">
            <span className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </span>
            <input
              value={form.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5 placeholder-gray-400 ${
                errors.phoneNumber ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="0912345678"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-400 mt-1">{errors.phoneNumber}</p>
            )}
          </label>

          {/** Representative */}
          <label className="block">
            <span className="text-sm font-medium">
              Representative <span className="text-red-500">*</span>
            </span>
            <input
              value={form.legalPresentative}
              onChange={(e) =>
                handleChange("legalPresentative", e.target.value)
              }
              className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5 placeholder-gray-400 ${
                errors.legalPresentative ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="Representative"
            />
            {errors.legalPresentative && (
              <p className="text-xs text-red-400 mt-1">
                {errors.legalPresentative}
              </p>
            )}
          </label>

          {/** Scale */}
          <label className="block">
            <span className="text-sm font-medium">Scale Capacity</span>
            <textarea
              value={form.scaleCapacity}
              onChange={(e) => handleChange("scaleCapacity", e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5 placeholder-gray-400"
              placeholder="20 tons / day, ..."
            />
            {errors.scaleCapacity && (
              <p className="text-xs text-red-400 mt-1">
                {errors.scaleCapacity}
              </p>
            )}
          </label>

          {/** Tax code */}
          <label className="block">
            <span className="text-sm font-medium">Tax Code</span>
            <input
              value={form.taxCode}
              onChange={(e) => handleChange("taxCode", e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5 placeholder-gray-400"
              placeholder="Tax code"
            />
            {errors.taxCode && (
              <p className="text-xs text-red-400 mt-1">{errors.taxCode}</p>
            )}
          </label>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            Operating Frequency <span className="text-red-500">*</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="operatingFrequency"
              checked={form.operatingFrequency === "regular"}
              onChange={() => handleChange("operatingFrequency", "regular")}
              className="h-4 w-4 cursor-pointer"
            />
            <span className="text-sm">Regular</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="operatingFrequency"
              checked={form.operatingFrequency === "seasonal"}
              onChange={() => handleChange("operatingFrequency", "seasonal")}
              className="h-4 w-4 cursor-pointer"
            />
            <span className="text-sm">Seasonal</span>
          </label>

          {/* conditional seasonal period input */}
          {form.operatingFrequency === "seasonal" && (
            <input
              value={form.seasonalPeriod || ""}
              onChange={(e) => handleChange("seasonalPeriod", e.target.value)}
              placeholder="Operational Period (Seasonal)"
              className="ml-4 rounded-lg border px-3 py-2 bg-white/5 placeholder-gray-400"
              style={{ minWidth: 220 }}
              disabled={form.operatingFrequency !== "seasonal"}
            />
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className={`cursor-pointer inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
            submitting
              ? "opacity-60 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Saving..." : "Save General Information"}
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="cursor-pointer px-3 py-2 rounded-lg text-sm border hover:bg-white/5"
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
