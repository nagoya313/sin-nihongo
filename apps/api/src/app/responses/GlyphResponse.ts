import { Document } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { Pagination } from '@sin-nihongo/api-interfaces';

export const glyphsResponse = <T extends Document>(data: PaginationModel<T>): Pagination<T> => {
  return {
    items: data.docs,
    meta: {
      totalItems: data.totalDocs,
      itemsPerPage: 20,
      itemCount: data.docs.length,
      totalPages: data.totalPages,
      currentPage: data.page || 1,
    },
  };
};
