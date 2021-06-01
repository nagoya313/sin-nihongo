import React, { useEffect, useState } from 'react';
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
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '@sin-nihongo/api-interfaces';
import { CardAvatar } from '../../components/CardAvatar';
import { ErrorTypography } from '../../components/ErrorTypography';
import { SearchNumberField } from '../../components/SearchNumberField';
import { SearchTextField } from '../../components/SearchTextField';
import { useAxiosGet } from '../../libs/axios';
import { Pagination as ApiPagination, Radical } from '@sin-nihongo/api-interfaces';
import { Pagination } from '../../components/Pagination';

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

const BodyTableRow = withTheme(styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`);

type Fields = 'id' | 'radical' | 'read' | 'numberOfStrokes' | 'show';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'radical', headerName: '部首' },
  { field: 'read', headerName: 'よみ' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'show', headerName: '' },
];

export const Radicals = () => {
  const [searchName, setSearchName] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [searchNumberOfStrokes, setSearchNumberOfStrokes] = useState('');
  const [radicals, setRadicals] = useState<Radical[]>();
  const [{ data, loading, error }, refetch] = useAxiosGet<ApiPagination<Radical>>('api/v1/radicals');
  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    if (searchName || searchNumberOfStrokes || pageNumber) {
      let params = { page: pageNumber };
      if (searchName) {
        params = Object.assign(params, { nameLike: searchName });
      }
      if (searchNumberOfStrokes) {
        params = Object.assign(params, { numberOfStrokes: searchNumberOfStrokes });
      }
      refetch({
        params: params,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {});
    }
  }, [refetch, searchName, searchNumberOfStrokes, pageNumber]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setRadicals(undefined);
      } else if (typeof data !== 'undefined') {
        setRadicals(data.items);
      }
    }
  }, [data, loading, error]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = radicals?.map((radical): { [key in Fields | 'key']: any } => ({
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
          <SearchTextField
            label="なまえ"
            onSearchWordChange={setSearchName}
            validation={validation}
            hint="例：いち、しょー、つずみ"
            errorMessage="検索ワードが不正です"
          />
          <SearchNumberField
            label="画数"
            inputProps={{
              inputProps: { min: 1 },
            }}
            onSearchNumberChange={setSearchNumberOfStrokes}
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
                <BodyTableRow key={`${row.key}`}>
                  {columns.map((column) => (
                    <TableCell key={`${column.field}_${row.key}`}>{row[column.field]}</TableCell>
                  ))}
                </BodyTableRow>
              ))}
            </TableBody>
          </Table>
          {radicals && (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <Pagination page={pageNumber} totalPages={data!.meta.totalPages} onPageChange={onPageChange} />
          )}
        </TableContainer>
      </CardContent>
    </Card>
  );
};
