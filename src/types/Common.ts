type TokenType = 'active_token' | 'access_token' | 'refresh_token';
export type Token = {
  [key in TokenType]?: string;
};

export interface ActiveToken {
  active_token: string;
}
export interface AccessToken {
  access_token: string;
}
export interface RefreshToken {
  refresh_token: string;
}
export interface MessageResponse {
  message: string;
}
export interface Pagination {
  limit: number;
  page_count: number;
  page_size: number;
  total: number;
}

export interface MetaPagination {
  pagination: Pagination;
}
export interface BaseDataResponse<T = any, M = undefined> extends MessageResponse {
  data?: T;
  success: boolean;
  status: number;
  meta: M;
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
export interface RejectValue {
  rejectValue: MessageResponse;
}
