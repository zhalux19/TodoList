export type PaginationRequest = {
  pageNumber: number
  pageSize: number
}

export type PaginationResponse<T> = {
  items: T[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type PaginationState<T> = {
  pageNumber: number
  totalPages: number
  pageItems: Record<number, T[]>
}
