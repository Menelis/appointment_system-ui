export interface PagedResult<T> {
  success: boolean;
  message: string;
  data: PageContentDTO<T>
}
export interface PageContentDTO<T> {
  content: T;
  page: PaginationDTO
}
export interface PaginationDTO {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
