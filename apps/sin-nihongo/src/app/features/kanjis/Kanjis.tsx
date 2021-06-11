import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { GetKanjisParams } from '@sin-nihongo/sin-nihongo-params';
import { CardHeader } from '../../components/CardHeader';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { RadioGroup } from '../../components/RadioGroup';
import { ResponseNotice } from '../../components/ResponseNotice';
import { Table } from '../../components/Table';
import { Text } from '../../components/Text';
import { useFetch } from '../../utils/axios';
import { EdiableProvider } from '../../utils/useEditable';
import { columns, Fields, KanjiRows } from './KanjiRows';
import { GlyphEditForm } from './GlyphEditForm';

const resolver = classValidatorResolver(GetKanjisParams);

type Props = {
  radicalId?: number;
};

const initialState = {
  ucs: '',
  readLike: '',
  numberOfStrokes: NaN,
  jisLevel: undefined,
  regular: undefined,
  forName: undefined,
} as GetKanjisParams;

export const Kanjis: React.FC<Props> = ({ radicalId }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValidating, isValid, errors },
  } = useForm<GetKanjisParams>({ mode: 'onChange', resolver, defaultValues: initialState });
  const [params, setParams] = useState<GetKanjisParams>();
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAanchorEl] = useState<HTMLButtonElement>();
  const [{ data, loading, error }] = useFetch(apiRoutes.getKanjis, {
    ...params,
    radicalId: radicalId,
    page: pageNumber,
  });

  const onPageChange = (page: number) => setPageNumber(page);

  const onSubmit = (data: GetKanjisParams) => {
    console.log(data);
    setParams({ ...data });
  };

  useEffect(() => {
    !isValidating && isValid && handleSubmit(onSubmit)();
  }, [isValidating, isValid]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpen(true);
    setAanchorEl(event.currentTarget);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => setPageNumber(1), [params]);

  const rows = KanjiRows(data?.items);

  return (
    <Card>
      <CardHeader avatarText="漢" title="新日本語漢字" />
      <CardContent>
        <Text>
          JIS第一、第二水準の漢字お検索できます。それ以外の漢字わ新日本語でわサポートしません。
          音読み・訓読みの検索わ表音式ひらがなの前方一致です。
        </Text>
        <Box display="flex">
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FormTextField
              errors={errors}
              register={register}
              name="ucs"
              label="漢字、UCS"
              type="search"
              helperText="例：一、u4e00"
            />
            <FormTextField
              errors={errors}
              register={register}
              name="readLike"
              label="音読み・訓読み"
              type="search"
              helperText="例：例：いち、さん、じょー"
            />
            <FormTextField errors={errors} register={register} name="numberOfStrokes" label="画数" type="number" />
            <RadioGroup
              control={control}
              name="jisLevel"
              title="JIS水準"
              type="number"
              labels={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '指定なし', value: '' },
              ]}
            />
            <RadioGroup
              control={control}
              name="regular"
              title="常用漢字"
              type="boolean"
              labels={[
                { label: '常用', value: 'true' },
                { label: '非常用', value: 'false' },
                { label: '指定なし', value: '' },
              ]}
            />
            <RadioGroup
              control={control}
              name="forName"
              title="人名用漢字"
              type="boolean"
              labels={[
                { label: '人名用', value: 'true' },
                { label: '非人名用', value: 'false' },
                { label: '指定なし', value: '' },
              ]}
            />
          </Form>
        </Box>
        <Divider />
        <ResponseNotice loading={loading} error={error} />
        <EdiableProvider>
          <Table<Fields>
            columns={columns}
            rows={rows}
            pageNumber={pageNumber}
            totalPages={data?.meta?.totalPages}
            onPageChange={onPageChange}
          />
        </EdiableProvider>
      </CardContent>
    </Card>
  );
};
