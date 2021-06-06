import React from 'react';
import styled from 'styled-components';
import { Table as MuiTable } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withTheme } from '@material-ui/core/styles';
import { Pagination } from './Pagination';

const HeaderTableCell = withTheme(styled(TableCell)`
  background-color: ${(props) => props.theme.palette.common.black};
  color: ${(props) => props.theme.palette.common.white};
`);

const BodyTableRow = withTheme(styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`);

type Props<Fields extends string> = {
  columns: { field: Fields; headerName: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows?: { [key in Fields | 'key']: any }[];
  pageNumber: number;
  totalPages?: number;
  onPageChange: (_: number) => void;
};

export function Table<Fields extends string>(props: Props<Fields>) {
  const { columns, rows, pageNumber, totalPages, onPageChange } = props;
  return (
    <TableContainer>
      <Pagination page={pageNumber} totalPages={totalPages} onPageChange={onPageChange} />
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <HeaderTableCell key={column.field}>{column.headerName}</HeaderTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <BodyTableRow key={`${row.key}`}>
              {columns.map((column) => (
                <TableCell key={`${column.field}_${row.key}`}>{row[column.field]}</TableCell>
              ))}
            </BodyTableRow>
          ))}
        </TableBody>
      </MuiTable>
      <Pagination page={pageNumber} totalPages={totalPages} onPageChange={onPageChange} />
    </TableContainer>
  );
}
