export interface MetaData {
  current_page: number;
  last_page: number;
  next: string | null;
  previous: string | null;
  records: number;
}

export interface BaseApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedApiResponse<T, M = MetaData> {
  data: T[];
  message: string;
  status: number;
  meta: M;
}
