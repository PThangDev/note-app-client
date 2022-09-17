export interface MessageResponse {
  message: string;
}

export interface Pagination {
  limit: string | null;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface BaseDataResponse<T = any> extends MessageResponse {
  data?: T;
  pagination?: Pagination;
}

export interface ErrorResponse {
  errors: {
    message: string;
    [key: string]: string;
  };
  status?: number;
}

export interface QueryParams {
  [key: string]: string | boolean;
}
