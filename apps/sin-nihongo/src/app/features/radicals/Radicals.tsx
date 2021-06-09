import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FindInPage from '@material-ui/icons/FindInPage';
import { RadicalsSearchParams, Pagination as ApiPagination, RadicalResponse } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { ResponseNotice } from '../../components/ResponseNotice';
import { Table } from '../../components/Table';
import { Text } from '../../components/Text';
import { useAxiosGet } from '../../utils/axios';

const resolver = classValidatorResolver(RadicalsSearchParams);

type Fields = 'id' | 'radical' | 'read' | 'numberOfStrokes' | 'show';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'radical', headerName: '部首' },
  { field: 'read', headerName: 'よみ' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'show', headerName: '部首で漢字絞り込み' },
];

const initialState = {
  nameLike: '',
  numberOfStrokes: NaN,
} as RadicalsSearchParams;

export const Radicals: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValidating, isValid, errors },
  } = useForm<RadicalsSearchParams>({
    mode: 'onChange',
    resolver,
    defaultValues: initialState,
  });
  const [searchParams, setSearchParams] = useState(initialState);
  const [pageNumber, setPageNumber] = useState(1);
  const [{ data, loading, error }] = useAxiosGet<ApiPagination<RadicalResponse>>('api/v1/radicals', {
    params: { ...searchParams, page: pageNumber },
  });

  const onSubmit = (data: RadicalsSearchParams) => setSearchParams({ ...data });
  const onPageChange = (page: number) => setPageNumber(page);
  useEffect(() => setPageNumber(1), [searchParams]);

  useEffect(() => {
    !isValidating && isValid && handleSubmit(onSubmit)();
  }, [isValidating, isValid]);

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
        <Box display="flex">
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FormTextField
              register={register}
              errors={errors}
              name="nameLike"
              label="なまえ"
              type="search"
              helperText="例：いち、しょー、つずみ"
            />
            <FormTextField register={register} errors={errors} name="numberOfStrokes" label="画数" type="number" />
          </Form>
        </Box>
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
