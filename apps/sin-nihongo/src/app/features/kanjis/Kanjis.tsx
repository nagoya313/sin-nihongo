import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Check from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import { Buhin } from '@kurgm/kage-engine';
import { Pagination as ApiPagination, Kanji, KanjisQueryParams } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { Form } from '../../components/Form';
import { FormTextField } from '../../components/FormTextField';
import { NewTabLink } from '../../components/NewTabLink';
import { RadioGroup } from '../../components/RadioGroup';
import { ResponseNotice } from '../../components/ResponseNotice';
import { Table } from '../../components/Table';
import { Text } from '../../components/Text';
import { useAxiosGet } from '../../utils/axios';

const resolver = classValidatorResolver(KanjisQueryParams);

type Fields =
  | 'ucs'
  | 'character'
  | 'kage'
  | 'radical'
  | 'numberOfStrokes'
  | 'regular'
  | 'forName'
  | 'kunyomi'
  | 'onyomi'
  | 'jisLevel'
  | 'action';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'ucs', headerName: 'ID' },
  { field: 'character', headerName: '漢字' },
  { field: 'kage', headerName: '新日本語字形' },
  { field: 'radical', headerName: '部首' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'regular', headerName: '常用漢字' },
  { field: 'forName', headerName: '人名用漢字' },
  { field: 'kunyomi', headerName: '訓読み' },
  { field: 'onyomi', headerName: '音読み' },
  { field: 'jisLevel', headerName: 'JIS水準' },
  { field: 'action', headerName: '' },
];

type Props = {
  radicalId?: string;
};

export const Kanjis: React.FC<Props> = ({ radicalId }) => {
  const methods = useForm<KanjisQueryParams>({
    resolver,
    defaultValues: { ucs: '', readLike: '', numberOfStrokes: NaN },
  });
  const [searchUcs, setSearchUcs] = useState('');
  const [searchRead, setSearchRead] = useState('');
  const [searchNumberOfStrokes, setSearchNumberOfStrokes] = useState(NaN);
  const [searchJisLevel, setSearchJisLevel] = useState('');
  const [searchRegular, setSearchRegular] = useState('');
  const [searchForName, setSearchForName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [buhin, setBuhin] = useState(new Buhin());
  const [{ data, loading, error }] = useAxiosGet<ApiPagination<Kanji>>('api/v1/kanjis', {
    params: {
      ucs: searchUcs,
      readLike: searchRead,
      numberOfStrokes: searchNumberOfStrokes,
      jisLevel: searchJisLevel,
      regular: searchRegular,
      forName: searchForName,
      radicalId: radicalId,
      page: pageNumber,
    },
  });

  const onPageChange = (page: number) => setPageNumber(page);

  const onSubmit = (data: KanjisQueryParams) => {
    setSearchUcs(data.ucs || '');
    setSearchRead(data.readLike || '');
    setSearchNumberOfStrokes(data.numberOfStrokes || NaN);
  };

  const onJisLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchJisLevel(event.target.value);
  };

  const onRegularChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRegular(event.target.value);
  };

  const onForNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForName(event.target.value);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [searchUcs, searchRead, searchNumberOfStrokes, searchJisLevel, searchRegular, searchForName]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = data?.items?.map((kanji): { [key in Fields | 'key']: any } => ({
    key: `kanji_${kanji.ucs}`,
    ucs: kanji.ucs,
    character: <NewTabLink url={`https://glyphwiki.org/wiki/${kanji.ucs}`} text={kanji.character} />,
    kage: <GlyphCanvas />,
    radical: kanji.radical.character,
    numberOfStrokes: kanji.numberOfStrokes,
    regular: kanji.regular && <Check />,
    forName: kanji.forName && <Check />,
    kunyomi: kanji.kunyomis.join('、'),
    onyomi: kanji.onyomis.join('、'),
    jisLevel: kanji.jisLevel,
    action: null,
  }));

  return (
    <Card>
      <CardHeader avatarText="漢" title="新日本語漢字" />
      <CardContent>
        <Text>
          JIS第一、第二水準の漢字お検索できます。それ以外の漢字わ新日本語でわサポートしません。
          音読み・訓読みの検索わ表音式ひらがなの前方一致です。
        </Text>
        <FormProvider {...methods}>
          <Box display="flex">
            <Form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
              <FormTextField name="ucs" label="漢字、UCS" type="search" helperText="例：一、u4e00" />
            </Form>
            <Form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
              <FormTextField
                name="readLike"
                label="音読み・訓読み"
                type="search"
                helperText="例：例：いち、さん、じょー"
              />
            </Form>
            <Form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
              <FormTextField name="numberOfStrokes" label="画数" type="number" />
            </Form>
          </Box>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <RadioGroup
              value={searchJisLevel}
              onChange={onJisLevelChange}
              title="JIS水準"
              labels={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '指定なし', value: '' },
              ]}
            />
            <RadioGroup
              value={searchRegular}
              onChange={onRegularChange}
              title="常用漢字"
              labels={[
                { label: '常用', value: 'true' },
                { label: '非常用', value: 'false' },
                { label: '指定なし', value: '' },
              ]}
            />
            <RadioGroup
              value={searchForName}
              onChange={onForNameChange}
              title="人名用漢字"
              labels={[
                { label: '人名用', value: 'true' },
                { label: '非人名用', value: 'false' },
                { label: '指定なし', value: '' },
              ]}
            />
          </Form>
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
