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

export type UnionPagination = {
  [Property in keyof Pagination]?: string;
};
export interface MetaPagination {
  pagination: Pagination;
}
export interface BaseDataResponse<T = unknown, M = unknown> extends MessageResponse {
  data: T;
  success: true;
  status: number;
  meta?: M;
}
export interface ErrorResponse<T = unknown> {
  data?: T;
  message: string;
  status: number;
  success: false;
}
export interface QueryParams {
  [key: string]: string | boolean;
}
export interface RejectValue<T = unknown> {
  rejectValue: ErrorResponse<T>;
}
