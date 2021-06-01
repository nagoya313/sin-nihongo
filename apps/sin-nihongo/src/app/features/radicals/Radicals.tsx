import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import FindInPage from '@material-ui/icons/FindInPage';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '@sin-nihongo/api-interfaces';
import { CardAvatar } from '../../components/CardAvatar';
import { ErrorTypography } from '../../components/ErrorTypography';
import { SearchForm } from '../../components/SearchForm';
import { useLazyAxiosGet } from '../../libs/axios';
import { Pagination, Radical } from '@sin-nihongo/api-interfaces';

const validation = (word: string) => word.match(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER) !== null || word === '';

const StyledForm = withTheme(styled.form`
  & > * {
    margin: ${(props) => props.theme.spacing(1)}px;
  }
`);

const HeaderTableCell = withTheme(styled(TableCell)`
  background-color: ${(props) => props.theme.palette.common.black};
  color: ${(props) => props.theme.palette.common.white};
`);

const RowTableCell = withTheme(styled(TableCell)`
  &:nth-of-type(odd) {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`);

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'radical', headerName: '部首' },
  { field: 'read', headerName: 'よみ' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'show', headerName: '' },
];

export const Radicals = () => {
  const [searchName, setSearchName] = useState('');
  const [radicals, setRadicals] = useState<Radical[]>();
  const [{ data, loading, error }, refetch] = useLazyAxiosGet<Pagination<Radical>>('api/v1/radicals');

  useEffect(() => {
    if (searchName) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      refetch({ params: { nameLike: searchName } }).catch(() => {});
    }
  }, [refetch, searchName]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setRadicals(undefined);
      } else if (typeof data !== 'undefined') {
        setRadicals(data.items);
      }
    }
  }, [data, loading, error]);

  const rows = radicals?.map((radical) => ({
    key: `radical_${radical.id}`,
    id: radical.id,
    radical: radical.character,
    read: radical.names.join('、'),
    numberOfStrokes: radical.numberOfStrokes,
    show: (
      <IconButton>
        <FindInPage />
      </IconButton>
    ),
  }));

  return (
    <Card>
      <CardHeader avatar={<CardAvatar>部</CardAvatar>} title="部首索引" titleTypographyProps={{ variant: 'h4' }} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          部首名（表音式の前方一致）か画数で検索できます。
        </Typography>
        <StyledForm noValidate autoComplete="off">
          <SearchForm
            label="なまえ"
            onSearchWordChange={setSearchName}
            validation={validation}
            hint="例：いち、しょー、つずみ"
            errorMessage="検索ワードが不正です"
          />
          <TextField
            label="画数"
            type="number"
            InputProps={{
              inputProps: { min: 1 },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </StyledForm>
        <Divider />
        {error && <ErrorTypography>{error.response?.data?.message}</ErrorTypography>}
        {loading && <Typography>検索中...</Typography>}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <HeaderTableCell key={column.field}>{column.headerName}</HeaderTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={`${row.key}`}>
                  {columns.map((column) => (
                    <RowTableCell key={`${column.field}_${row.key}`}>{row[column.field]}</RowTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
