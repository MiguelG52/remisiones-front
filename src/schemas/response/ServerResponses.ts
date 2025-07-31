import { ApiError } from "../error/error";

export interface SuccessfulResponse<T> {
  success: true;
  data?: T;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: ApiError;
}

export type ServerGenericResponse<T> = SuccessfulResponse<T> | ErrorResponse;