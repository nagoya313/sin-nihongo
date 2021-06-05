import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import { Buhin } from '@kurgm/kage-engine';
import { Glyphs as ApiGlyphs, Glyph } from '@sin-nihongo/api-interfaces';
import { CardAvatar } from '../../components/CardAvatar';
import { ErrorTypography } from '../../components/ErrorTypography';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { SearchTextField } from '../../components/SearchTextField';
import { Table } from '../../components/Table';
import { useAxiosGet } from '../../libs/axios';
import { splitData } from '../../utils/kageData';

type Fields = 'glyph' | 'name' | 'data' | 'show' | 'delete';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'name', headerName: '名前' },
  { field: 'glyph', headerName: '生成グリフ' },
  { field: 'data', headerName: 'KAGEデータ' },
  { field: 'show', headerName: '' },
  { field: 'delete', headerName: '' },
];

export const Glyphs = () => {
  const { isAuthenticated } = useAuth0();
  const [searchName, setSearchName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [glyphs, setGlyphs] = useState<Glyph[]>();
  const [buhin, setBuhin] = useState(new Buhin());
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
        const b = new Buhin();
        if (data) {
          data.items.forEach((glyph) => {
            b.push(glyph.name, glyph.data);
          });
          data.includeGlyphs?.forEach((glyph) => {
            b.push(glyph.name, glyph.data);
          });
        }
        setBuhin(b);
        console.log(b);
      }
    }
  }, [data, loading, error]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = glyphs?.map((glyph): { [key in Fields | 'key']: any } => ({
    key: `glyph_${glyph.id}`,
    name: glyph.name,
    glyph: <GlyphCanvas buhin={buhin} name={glyph.name} />,
    data: splitData(glyph.data),
    show: (
      <IconButtonRouteLink to="/">
        <DescriptionIcon />
      </IconButtonRouteLink>
    ),
    delete: isAuthenticated ? (
      <IconButtonRouteLink to="/">
        <DeleteIcon />
      </IconButtonRouteLink>
    ) : null,
  }));

  return (
    <Card>
      <CardHeader avatar={<CardAvatar>グ</CardAvatar>} title="グリフ一覧" titleTypographyProps={{ variant: 'h4' }} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          新日本語で採用された字形およびその部品のKAGEデータとその生成グリフお閲覧できます。
          グリフ名で検索もできます（グリフ名わグリフウィキとおーむね一致です）。
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
