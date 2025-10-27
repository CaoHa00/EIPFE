export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface ApiError {
  code: number;
  message: string;
  result?: FieldError[];
}

export interface FieldError {
  field: string;
  errorCode: string;
  message: string;
}
