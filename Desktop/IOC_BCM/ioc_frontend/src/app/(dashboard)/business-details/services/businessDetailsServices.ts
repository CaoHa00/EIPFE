import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  GeneralInformation,
  GeneralInformationResponse,
} from "../types/businessDetails";

export async function submitGeneralInformation(
  data: GeneralInformation & { userAccountId: string }
) {
  const response = await api.post<ApiResponse<GeneralInformationResponse>>(
    "/user-detail",
    {
      body: JSON.stringify(data),
    }
  );
  return response.data;
}
