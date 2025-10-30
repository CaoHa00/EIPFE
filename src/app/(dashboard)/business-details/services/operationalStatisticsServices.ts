import { api } from "@/lib/axios";
import { OperationalFormPayload } from "../types/operationalStatistics";

export async function submitOperationalStatistics(
  payload: OperationalFormPayload
) {
  const res = await api.post("/operational-statistics", payload);
  return res.data;
}
