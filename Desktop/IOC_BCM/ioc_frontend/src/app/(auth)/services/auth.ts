// app/(auth)/services/auth.ts
import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type {
  CreateUserResult,
  LoginResult,
  NewUser,
} from "@/app/(auth)/types/user";

/* reuse / adapt these shapes from earlier answer or keep here for clarity */

/** Register */
export async function registerUser(payload: NewUser) {
  const resp = await api.post<ApiResponse<CreateUserResult>>(
    "/user-account/create",
    {
      email: payload.email,
      password: payload.password,
      phoneNumber: payload.phonenumber,
      fullName: payload.fullname,
    }
  );
  return resp.data;
}

/** Login */
export async function loginUser(params: { email: string; password: string }) {
  const resp = await api.post<ApiResponse<LoginResult>>(
    "/authentication/login",
    params
  );
  return resp.data;
}
