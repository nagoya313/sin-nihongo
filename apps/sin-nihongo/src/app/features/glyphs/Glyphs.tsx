import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import { Buhin } from '@kurgm/kage-engine';
import { Glyphs as ApiGlyphs, Glyph, Message } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { ErrorTypography } from '../../components/ErrorTypography';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { SearchTextField } from '../../components/SearchTextField';
import { Table } from '../../components/Table';
import { Text } from '../../components/Text';
import { NoticeDispatchContext } from '../notice/Notice';
import { useAxiosGet, useLazyAxiosDelete } from '../../utils/axios';
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
  const [open, setOpen] = React.useState(false);
  const noticeDispatch = useContext(NoticeDispatchContext);
  const [deleteID, setDeleteId] = React.useState('');
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [searchName, setSearchName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [glyphs, setGlyphs] = useState<Glyph[]>();
  const [buhin, setBuhin] = useState(new Buhin());
  const [getResponse, getRefetch] = useAxiosGet<ApiGlyphs>('api/v1/glyphs');
  const [deleteResponse, deleteRefetch] = useLazyAxiosDelete<Message>('');

  const refetchGetRequest = () => {
    // ""を送るとclass-validatorが誤作動してエラーを返すのでundefinedを明示的に入れる
    getRefetch({
      params: { page: pageNumber, nameLike: searchName || undefined },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch(() => {});
  };

  const notDeleteClose = () => {
    setDeleteId('');
    setOpen(false);
  };

  const onDeleteClose = async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const token = await getAccessTokenSilently({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      audience: process.env.NX_API_IDENTIFIER!,
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await deleteRefetch({ url: `api/v1/glyphs/${deleteID}`, headers: accessTokenHeader(token) }).catch(() => {});
    setDeleteId('');
    refetchGetRequest();
  };

  useEffect(() => setPageNumber(1), [searchName]);

  useEffect(() => {
    refetchGetRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName, pageNumber]);

  useEffect(() => {
    const { data, loading, error } = getResponse;
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
      }
    }
  }, [getResponse]);

  useEffect(() => {
    const { data, loading, error } = deleteResponse;
    if (!loading) {
      if (error) {
        noticeDispatch({ type: 'open', message: error.message, severity: 'error' });
        setOpen(false);
      } else if (data) {
        noticeDispatch({ type: 'open', message: data.message, severity: 'success' });
        setOpen(false);
      }
    }
  }, [deleteResponse, noticeDispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = glyphs?.map((glyph): { [key in Fields | 'key']: any } => ({
    key: `glyph_${glyph.id}`,
    name: glyph.name,
    glyph: <GlyphCanvas buhin={buhin} name={glyph.name} />,
    data: splitData(glyph.data),
    show: <IconButtonRouteLink to="/" icon={<DescriptionIcon />} />,
    delete: isAuthenticated ? (
      <IconButton
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          setDeleteId(glyph.id!);
          setOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
    ) : null,
  }));

  return (
    <Card>
      <CardHeader
        avatarText="グ"
        title="グリフ一覧"
        action={isAuthenticated ? <IconButtonRouteLink to="/glyphs/new" icon={<BuildIcon />} /> : undefined}
      />
      <CardContent>
        <Text>
          新日本語で採用された字形およびその部品のKAGEデータとその生成グリフお閲覧できます。
          グリフ名で検索もできます（グリフ名わグリフウィキとおーむね一致です）。
        </Text>
        <SearchTextField label="グリフ名" onSearchWordChange={setSearchName} hint="例：u4e00" />
        <Divider />
        {getResponse.error && <ErrorTypography>{getResponse.error.response?.data?.message}</ErrorTypography>}
        {getResponse.loading && <Typography>検索中...</Typography>}
        <Table<Fields>
          columns={columns}
          rows={rows}
          pageNumber={pageNumber}
          totalPages={getResponse.data?.meta?.totalPages}
          onPageChange={(page: number) => setPageNumber(page)}
        />
      </CardContent>
      {isAuthenticated ? (
        <Dialog open={open} onClose={notDeleteClose}>
          <DialogTitle>グリフお本当に削除しますか？</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <DialogActions>
                <Button onClick={notDeleteClose} color="primary">
                  いーえ
                </Button>
                <Button onClick={onDeleteClose} color="primary" autoFocus>
                  はい
                </Button>
              </DialogActions>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : null}
    </Card>
  );
};
