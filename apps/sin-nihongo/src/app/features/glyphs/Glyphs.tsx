import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Glyphs as ApiGlyphs, Glyph } from '@sin-nihongo/api-interfaces';
import { CardAvatar } from '../../components/CardAvatar';
import { ErrorTypography } from '../../components/ErrorTypography';
import { SearchTextField } from '../../components/SearchTextField';
import { Table } from '../../components/Table';
import { useAxiosGet } from '../../libs/axios';

type Fields = 'id' | 'glyph' | 'name' | 'data' | 'show';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: '名前' },
  { field: 'glyph', headerName: '生成グリフ' },
  { field: 'data', headerName: 'KAGEデータ' },
  { field: 'show', headerName: '' },
];

export const Glyphs = () => {
  const [searchName, setSearchName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [glyphs, setGlyphs] = useState<Glyph[]>();
  const [{ data, loading, error }, refetch] = useAxiosGet<ApiGlyphs>('api/v1/glyphs');

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [searchName]);

  useEffect(() => {
    // ""を送るとclass-validatorが誤作動してエラーを返すのでundefinedを明示的に入れる
    refetch({
      params: {
        page: pageNumber,
        nameLike: searchName || undefined,
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch(() => {});
  }, [refetch, searchName, pageNumber]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setGlyphs(undefined);
      } else if (typeof data !== 'undefined') {
        setGlyphs(data.items);
      }
    }
  }, [data, loading, error]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = glyphs?.map((glyph): { [key in Fields | 'key']: any } => ({
    key: `glyph_${glyph.id}`,
    id: glyph.id,
    name: glyph.name,
    glyph: '',
    data: glyph.data,
    show: '',
  }));

  return (
    <Card>
      <CardHeader avatar={<CardAvatar>グ</CardAvatar>} title="グリフ一覧" titleTypographyProps={{ variant: 'h4' }} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          新日本語で採用された字形およびその部品のKAGEデータとその生成グリフお閲覧できます。グリフ名で検索もできます（グリフ名わグリフウィキとおーむね一致です）。
        </Typography>
        <SearchTextField label="グリフ名" onSearchWordChange={setSearchName} hint="例：u4e00" />
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
