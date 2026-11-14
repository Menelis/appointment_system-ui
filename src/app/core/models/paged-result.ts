export interface PagedResult<T> {
  content: T;
  page: PaginationDTO;
}
export interface PaginationDTO {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
