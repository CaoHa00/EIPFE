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
