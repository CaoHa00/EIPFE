"use client";
import { useEffect, useRef, useState } from "react";

const DEFAULT_KEY = "env_report_draft_v1";

export const loadDraft = <T,>(key = DEFAULT_KEY): T | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

const jsonReplacer = (_k: string, v: unknown) => {
  if (typeof File !== "undefined" && v instanceof File) return null;
  return v as any;
};

export const saveDraft = <T,>(data: T, key = DEFAULT_KEY) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data, jsonReplacer));
};

export const clearDraft = (key = DEFAULT_KEY) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};

export type UseAutosaveReturn = { trigger: () => void; saving: boolean };
export function useAutosave<T>(key: string, value: T, delay = 500): UseAutosaveReturn {
  const [saving, setSaving] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // On mount, dispatch restore event for listeners if any
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      window.dispatchEvent(new CustomEvent("autosave:restore", { detail: parsed }));
    } catch {}
  }, [key]);

  const trigger = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setSaving(true);
      try {
        localStorage.setItem(key, JSON.stringify(value, jsonReplacer));
      } finally {
        setSaving(false);
      }
    }, delay);
  };

  return { trigger, saving };
}
