export interface PagedResult<T> {
  success: boolean;
  message: string;
  data: PageContentDTO<T>;
  page: PaginationDTO
}
export interface PageContentDTO<T> {
  content: T
}
export interface PaginationDTO {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
