"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/app/context/auth-context";
import { submitOperationalStatistics } from "../services/operationalStatisticsServices";
import {
  OperationalFormPayload,
  YearlyOperational,
} from "../types/operationalStatistics";

function emptyYearly(): YearlyOperational {
  return {
    product_volume: "",
    product_unit: "",
    fuel_consumption: "",
    fuel_unit: "",
    electricity_consumption: "",
    water_consumption: "",
  };
}

export function useOperationalForm() {
  const { user } = useAuth();
  const userAccountId = user?.id ?? "";

  // Compute years: reportingYear = previous calendar year; previous = reportingYear - 1
  const reportingYear = useMemo(() => new Date().getFullYear() - 1, []);
  const previousYear = reportingYear - 1;

  const [yearsData, setYearsData] = useState<
    { year: number; data: YearlyOperational }[]
  >([
    { year: reportingYear, data: emptyYearly() },
    { year: previousYear, data: emptyYearly() },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  function setField(
    yearIndex: number,
    key: keyof YearlyOperational,
    value: any
  ) {
    setYearsData((prev) =>
      prev.map((y, idx) =>
        idx === yearIndex ? { ...y, data: { ...y.data, [key]: value } } : y
      )
    );
    // clear relevant error
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`y${yearIndex}.${String(key)}`];
      return copy;
    });
    setMessage(null);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    yearsData.forEach((y, idx) => {
      const d = y.data;
      const base = `y${idx}`;
      // product_volume required and numeric >= 0
      if (d.product_volume === "" || d.product_volume === null) {
        e[`${base}.product_volume`] = "Product volume is required";
      } else if (
        Number.isNaN(Number(d.product_volume)) ||
        Number(d.product_volume) < 0
      ) {
        e[`${base}.product_volume`] =
          "Product volume must be a non-negative number";
      }

      if (!String(d.product_unit || "").trim()) {
        e[`${base}.product_unit`] = "Product unit is required";
      }

      if (d.fuel_consumption === "" || d.fuel_consumption === null) {
        e[`${base}.fuel_consumption`] = "Fuel consumption is required";
      } else if (
        Number.isNaN(Number(d.fuel_consumption)) ||
        Number(d.fuel_consumption) < 0
      ) {
        e[`${base}.fuel_consumption`] =
          "Fuel consumption must be a non-negative number";
      }

      if (!String(d.fuel_unit || "").trim()) {
        e[`${base}.fuel_unit`] = "Fuel unit is required";
      }

      if (
        d.electricity_consumption === "" ||
        d.electricity_consumption === null
      ) {
        e[`${base}.electricity_consumption`] =
          "Electricity consumption is required";
      } else if (
        Number.isNaN(Number(d.electricity_consumption)) ||
        Number(d.electricity_consumption) < 0
      ) {
        e[`${base}.electricity_consumption`] =
          "Electricity consumption must be a non-negative number";
      }

      if (d.water_consumption === "" || d.water_consumption === null) {
        e[`${base}.water_consumption`] = "Water consumption is required";
      } else if (
        Number.isNaN(Number(d.water_consumption)) ||
        Number(d.water_consumption) < 0
      ) {
        e[`${base}.water_consumption`] =
          "Water consumption must be a non-negative number";
      }
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setMessage(null);

    try {
      const payload: OperationalFormPayload = {
        years: yearsData.map((y) => ({
          year: y.year,
          data: {
            product_volume: Number(y.data.product_volume),
            product_unit: y.data.product_unit,
            fuel_consumption: Number(y.data.fuel_consumption),
            fuel_unit: y.data.fuel_unit,
            electricity_consumption: Number(y.data.electricity_consumption),
            water_consumption: Number(y.data.water_consumption),
          },
        })),
        userAccountId,
      };

      const res = await submitOperationalStatistics(payload);
      setMessage({
        type: "success",
        text: res?.message || "Operational statistics saved",
      });
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Network error" });
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setYearsData([
      { year: reportingYear, data: emptyYearly() },
      { year: previousYear, data: emptyYearly() },
    ]);
    setErrors({});
    setMessage(null);
  }

  return {
    reportingYear,
    previousYear,
    yearsData,
    setField,
    errors,
    submitting,
    message,
    handleSubmit,
    reset,
  };
}
