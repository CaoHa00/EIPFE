"use client";

import React from "react";
import { useOperationalForm } from "../hooks/useOperationalStatisticsForm";

const unitOptions = ["tons", "kg", "liters", "m3", "kWh", "units", "other"];

export default function OperationalStatisticsForm() {
  const {
    reportingYear,
    previousYear,
    yearsData,
    setField,
    errors,
    submitting,
    message,
    handleSubmit,
    reset,
  } = useOperationalForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-6"
    >
      {yearsData.map((y, idx) => (
        <div key={y.year} className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">{y.year}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Product Volume <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={y.data.product_volume as any}
                onChange={(e) =>
                  setField(idx, "product_volume", e.target.value)
                }
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                placeholder="e.g. 1200"
              />
              {errors[`y${idx}.product_volume`] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[`y${idx}.product_volume`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Product Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={y.data.product_unit}
                onChange={(e) => setField(idx, "product_unit", e.target.value)}
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
              >
                <option value="">Select unit</option>
                {unitOptions.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors[`y${idx}.product_unit`] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[`y${idx}.product_unit`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Fuel Consumption <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={y.data.fuel_consumption as any}
                onChange={(e) =>
                  setField(idx, "fuel_consumption", e.target.value)
                }
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                placeholder="e.g. 500"
              />
              {errors[`y${idx}.fuel_consumption`] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[`y${idx}.fuel_consumption`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Fuel Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={y.data.fuel_unit}
                onChange={(e) => setField(idx, "fuel_unit", e.target.value)}
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
              >
                <option value="">Select unit</option>
                {unitOptions.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors[`y${idx}.fuel_unit`] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[`y${idx}.fuel_unit`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Electricity Consumption (kWh){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={y.data.electricity_consumption as any}
                onChange={(e) =>
                  setField(idx, "electricity_consumption", e.target.value)
                }
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                placeholder="e.g. 12000"
              />
              {errors[`y${idx}.electricity_consumption`] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[`y${idx}.electricity_consumption`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Water Consumption (m3) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={y.data.water_consumption as any}
                onChange={(e) =>
                  setField(idx, "water_consumption", e.target.value)
                }
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white/5"
                placeholder="e.g. 3000"
              />
              {errors[`y${idx}.water_consumption`] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[`y${idx}.water_consumption`]}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

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
          {submitting ? "Saving..." : "Save Operational Statistics"}
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
