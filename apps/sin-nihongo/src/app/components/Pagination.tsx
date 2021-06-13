import React from 'react';
import { Pagination as MuiPagination } from '@material-ui/lab';

export type PaginationProps = {
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => onPageChange && onPageChange(value);

  return (
    <MuiPagination
      page={page}
      count={totalPages}
      shape="rounded"
      onChange={handleChange}
      showFirstButton
      showLastButton
    />
  );
};
