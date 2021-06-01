import React, { useEffect, useState } from 'react';
import * as qs from 'qs';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Check from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import {
  RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER,
  Pagination as ApiPagination,
  Kanji,
} from '@sin-nihongo/api-interfaces';
import { CardAvatar } from '../../components/CardAvatar';
import { ErrorTypography } from '../../components/ErrorTypography';
import { SearchNumberField } from '../../components/SearchNumberField';
import { SearchTextField } from '../../components/SearchTextField';
import { Table } from '../../components/Table';
import { useAxiosGet } from '../../libs/axios';

const validation = (word: string) => word.match(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER) !== null || word === '';

const StyledForm = withTheme(styled.form`
  & > * {
    margin: ${(props) => props.theme.spacing(1)}px;
  }
`);

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
  { field: 'kage', headerName: '実装' },
  { field: 'radical', headerName: '部首' },
  { field: 'numberOfStrokes', headerName: '画数' },
  { field: 'regular', headerName: '常用漢字' },
  { field: 'forName', headerName: '人名用漢字' },
  { field: 'kunyomi', headerName: '訓読み' },
  { field: 'onyomi', headerName: '音読み' },
  { field: 'jisLevel', headerName: 'JIS水準' },
  { field: 'action', headerName: '' },
];

export const Kanjis = () => {
  const location = useLocation();
  const [searchRead, setSearchRead] = useState('');
  const [searchNumberOfStrokes, setSearchNumberOfStrokes] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [{ data, loading, error }, refetch] = useAxiosGet<ApiPagination<Kanji>>('api/v1/kanjis');
  const [kanjis, setKanjis] = useState<Kanji[]>();
  console.log(location.search.substr(1));

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    if (pageNumber) {
      // ""を送るとclass-validatorが誤作動してエラーを返すのでundefinedを明示的に入れる
      refetch({
        params: {
          readLike: searchRead,
          page: pageNumber,
          radicalId: qs.parse(location.search.substr(1))['radical_id'],
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {});
    }
  }, [refetch, searchRead, pageNumber, location.search]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setKanjis(undefined);
      } else if (typeof data !== 'undefined') {
        setKanjis(data.items);
      }
    }
  }, [data, loading, error]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = kanjis?.map((kanji): { [key in Fields | 'key']: any } => ({
    key: `kanji_${kanji.ucs}`,
    ucs: kanji.ucs,
    character: (
      <Link href={`https://glyphwiki.org/wiki/${kanji.ucs}`} target="_blank" rel="noopener">
        {kanji.character}
      </Link>
    ),
    kage: null,
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
      <CardHeader avatar={<CardAvatar>漢</CardAvatar>} title="新日本語漢字" titleTypographyProps={{ variant: 'h4' }} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          JIS第一、第二水準の漢字を検索できます。それ以外の漢字は新日本語ではサポートしません。音読み、訓読みの検索は表音式ひらがなの前方一致です。
        </Typography>
        <StyledForm noValidate autoComplete="off">
          <SearchTextField
            label="音読み・訓読み"
            onSearchWordChange={setSearchRead}
            validation={validation}
            hint="例：いち、さん、じょー"
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
