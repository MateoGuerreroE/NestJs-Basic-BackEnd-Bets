export interface ApiResponse<T> {
  statusCode: number;
  payload?: T;
  message?: string;
  error?: string;
}
