//app/(auth)/types/user.ts

export interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phonenumber: string;
}

export interface NewUser {
  fullname: string;
  email: string;
  password: string;
  phonenumber: string;
}

export interface CreateUserResult {
  userAccountId: string;
  email: string;
  password?: string | null;
  fullName: string;
  phoneNumber: string;
}

export interface LoginResult {
  userAccountId: string;
  email: string;
  password: string | null;
  enable: boolean;
  phoneNumber: string | null;
  fullName: string;
  roles: any[];
  userDetail: any | null;
}
