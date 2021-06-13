import styled from 'styled-components';
import { Table as MuiTable } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withTheme } from '@material-ui/core/styles';
import { Pagination } from './Pagination';
import { ParamsPayload } from '../utils/useSearchForm';

const HeaderTableCell = withTheme(styled(TableCell)`
  background-color: ${(props) => props.theme.palette.common.black};
  color: ${(props) => props.theme.palette.common.white};
`);

const BodyTableRow = withTheme(styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`);

type ColumnsType<F> = { field: keyof F & string; headerName: string };
type RowsType<R extends ParamsPayload<R>> = ParamsPayload<R> & { key: string };

type Props<R> = {
  columns: ColumnsType<ParamsPayload<R>>[];
  rows?: RowsType<R>[];
  pageNumber?: number;
  totalPages?: number;
  onPageChange?: (_: number) => void;
};

export function Table<R extends ParamsPayload<R>>({ columns, rows, pageNumber, totalPages, onPageChange }: Props<R>) {
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
            <BodyTableRow key={`table_row_${row.key}`}>
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
