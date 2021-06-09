import { Pagination, PaginationQueryParams } from '@sin-nihongo/api-interfaces';

export const addPageData = <T>(data: T[], count: number, query: PaginationQueryParams): Pagination<T> => {
  console.log('+++++++++++++++++++');
  console.log(query);
  return {
    items: data,
    meta: {
      totalItems: count,
      itemsPerPage: query.itemsPerPage,
      itemCount: data.length,
      totalPages: Math.ceil(count / query.itemsPerPage),
      currentPage: query.currentPage,
    },
  };
};
