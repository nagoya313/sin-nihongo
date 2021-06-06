import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FindInPage from '@material-ui/icons/FindInPage';
import { withTheme } from '@material-ui/core/styles';
import {
  RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER,
  Pagination as ApiPagination,
  Radical,
} from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { ResponseNotice } from '../../components/ResponseNotice';
import { SearchNumberField } from '../../components/SearchNumberField';
import { SearchTextField } from '../../components/SearchTextField';
import { Table } from '../../components/Table';
import { Text } from '../../components/Text';
import { useAxiosGet } from '../../utils/axios';

const validation = (word: string) => word.match(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER) !== null || word === '';

const StyledForm = withTheme(styled.form`
  & > * {
    margin: ${(props) => props.theme.spacing(1)}px;
  }
`);

type Fields = 'id' | 'radical' | 'read' | 'numberOfStrokes' | 'show';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'radical', headerName: '部首' },
  { field: 'read', headerName: 'よみ' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'show', headerName: '部首で漢字絞り込み' },
];

export const Radicals: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [searchNumberOfStrokes, setSearchNumberOfStrokes] = useState('');
  const [radicals, setRadicals] = useState<Radical[]>();
  const [{ data, loading, error }, refetch] = useAxiosGet<ApiPagination<Radical>>('api/v1/radicals');

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [searchName, searchNumberOfStrokes]);

  useEffect(() => {
    // ""を送るとclass-validatorが誤作動してエラーを返すのでundefinedを明示的に入れる
    refetch({
      params: {
        page: pageNumber,
        nameLike: searchName || undefined,
        numberOfStrokes: searchNumberOfStrokes || undefined,
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch(() => {});
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
    show: <IconButtonRouteLink to={`radicals/${radical.id}/kanjis`} icon={<FindInPage />} />,
  }));

  return (
    <Card>
      <CardHeader avatarText="部" title="部首索引" />
      <CardContent>
        <Text>部首名（表音式ひらがなの前方一致）か画数で検索できます。</Text>
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
        <ResponseNotice loading={loading} error={error} />
        <Table<Fields>
          columns={columns}
          rows={rows}
          pageNumber={pageNumber}
          totalPages={data?.meta?.totalPages}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
};
