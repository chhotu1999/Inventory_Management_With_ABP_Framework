
export interface ResponseResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
