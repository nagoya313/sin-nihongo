import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FindInPage from '@material-ui/icons/FindInPage';
import { RadicalsQueryParams, Pagination as ApiPagination, Radical } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { ResponseNotice } from '../../components/ResponseNotice';
import { Table } from '../../components/Table';
import { Text } from '../../components/Text';
import { useAxiosGet } from '../../utils/axios';

const resolver = classValidatorResolver(RadicalsQueryParams);

type Fields = 'id' | 'radical' | 'read' | 'numberOfStrokes' | 'show';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'radical', headerName: '部首' },
  { field: 'read', headerName: 'よみ' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'show', headerName: '部首で漢字絞り込み' },
];

export const Radicals: React.FC = () => {
  const methods = useForm<RadicalsQueryParams>({
    resolver,
    defaultValues: { nameLike: '', numberOfStrokes: NaN },
  });
  const [searchName, setSearchName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [searchNumberOfStrokes, setSearchNumberOfStrokes] = useState(NaN);
  const [{ data, loading, error }] = useAxiosGet<ApiPagination<Radical>>('api/v1/radicals', {
    params: { page: pageNumber, nameLike: searchName, numberOfStrokes: searchNumberOfStrokes },
  });

  const onSubmit = (data: RadicalsQueryParams) => {
    setSearchName(data.nameLike || '');
    setSearchNumberOfStrokes(data.numberOfStrokes || NaN);
  };

  const onPageChange = (page: number) => setPageNumber(page);

  useEffect(() => setPageNumber(1), [searchName, searchNumberOfStrokes]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = data?.items?.map((radical): { [key in Fields | 'key']: any } => ({
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
        <FormProvider {...methods}>
          <Box display="flex">
            {/* 各入力欄毎にエンターで検索が発火するやうに分割 */}
            <Form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
              <FormTextField name="nameLike" label="なまえ" type="search" helperText="例：いち、しょー、つずみ" />
            </Form>
            <Form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
              <FormTextField name="numberOfStrokes" label="画数" type="number" />
            </Form>
          </Box>
        </FormProvider>
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
