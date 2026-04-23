export interface ApiListResponse<T> {
  data: T[];
  meta?: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface ApiSingleResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  code: string;
  traceId?: string;
}
