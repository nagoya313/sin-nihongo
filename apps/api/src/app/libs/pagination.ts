import { Pagination, PaginationQueryParams } from '@sin-nihongo/api-interfaces';

export const addPageData = <T>(data: T[], count: number, query: PaginationQueryParams): Pagination<T> => {
  return {
    items: data,
    meta: {
      totalItems: count,
      itemsPerPage: 20,
      itemCount: data.length,
      totalPages: Math.ceil(count / 20),
      currentPage: query.page || 1,
    },
  };
};
