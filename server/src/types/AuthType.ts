import { User } from "src/entities/User";
import { FieldError } from "./FieldError";
import ResponseField from "./ResponseField";

export interface LoginInput {
  usernameOrEmail: string;
  password: string;
}
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export class ResponseAuth implements ResponseField {
  code: number;
  success: boolean;
  message?: string | undefined;
  user?: User;
  error?: FieldError[];
  accessToken?: string;
  refreshToken?: string;
}

export class ResponseRefreshToken implements ResponseField {
  code: number;
  success: boolean;
  message?: string | undefined;
  accessToken?: string | undefined;
}

export interface InputUpdateUser {
  name: string;
  email: string;
  address: string;
  phone: string;
  image?: File;
}
