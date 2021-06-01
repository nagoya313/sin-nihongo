import React, { useCallback } from 'react';
import { Pagination as MuiPagination } from '@material-ui/lab';

export interface PaginationProps {
  readonly page: number;
  readonly totalPages?: number;
  readonly onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const handleChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => onPageChange(value), [
    onPageChange,
  ]);

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
