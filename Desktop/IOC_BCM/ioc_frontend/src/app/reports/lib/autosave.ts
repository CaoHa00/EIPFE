// src/lib/autosave.ts
const KEY = "env_report_draft_v1";
export const loadDraft = <T>(key = KEY): T | null => {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
};
export const saveDraft = <T>(data: T, key = KEY) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};
export const clearDraft = (key = KEY) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
