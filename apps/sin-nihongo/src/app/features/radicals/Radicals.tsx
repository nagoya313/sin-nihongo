import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { apiRoutes, GetRadicalsRequest } from '@sin-nihongo/api-interfaces';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { FlexBox } from '../../components/Box';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { ResponseNotice } from '../../components/ResponseNotice';
import { Table } from '../../components/Table';
import { Text } from '../../components/Typography';
import { useFetch } from '../../utils/axios';
import { columns, Fields, RadicalRows } from './RadicalRows';

const resolver = classValidatorResolver(GetRadicalsParams);

const initialState = {
  nameLike: '',
  numberOfStrokes: NaN,
};

export const Radicals: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValidating, isValid, errors },
  } = useForm<GetRadicalsParams>({
    mode: 'onChange',
    resolver,
    defaultValues: initialState,
  });
  const [searchParams, setSearchParams] = useState<GetRadicalsRequest>();
  const [pageNumber, setPageNumber] = useState(1);
  const [{ data, loading, error }] = useFetch(apiRoutes.getRadicals, {
    ...searchParams,
    page: pageNumber,
  });

  const onSubmit = (data: GetRadicalsParams) => {
    console.log(data);
    setSearchParams({ ...data });
  };
  const onPageChange = (page: number) => setPageNumber(page);
  useEffect(() => setPageNumber(1), [searchParams]);

  useEffect(() => {
    !isValidating && isValid && handleSubmit(onSubmit)();
  }, [isValidating, isValid]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = RadicalRows(data?.items);

  return (
    <Card>
      <CardHeader avatarText="部" title="部首索引" />
      <CardContent>
        <Text>部首名（表音式ひらがなの前方一致）か画数で検索できます。</Text>
        <FlexBox>
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
        </FlexBox>
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
