import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { BuhinDispatchContext } from '../../providers/Buhin';
import { CardHeader } from '../../components/CardHeader';
import { Dialog } from '../../components/Dialog';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButton } from '../../components/IconButton';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { ResponseNotice } from '../../components/ResponseNotice';
import { Table } from '../../components/Table';
import { Text } from '../../components/Text';
import { NoticeDispatchContext } from '../../providers/Notice';
import { errorHandler, useFetch } from '../../utils/axios';
import { splitData } from '../../utils/kageData';
import { useAccessToken } from '../../utils/auth0';
import { SearchForm } from './SearchForm';

type Fields = 'glyph' | 'name' | 'data' | 'show' | 'delete';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'name', headerName: '名前' },
  { field: 'glyph', headerName: '生成グリフ' },
  { field: 'data', headerName: 'KAGEデータ' },
  { field: 'show', headerName: '' },
  { field: 'delete', headerName: '' },
];

export const Glyphs = () => {
  const getAccessToken = useAccessToken();
  const [open, setOpen] = React.useState(false);
  const noticeDispatch = useContext(NoticeDispatchContext);
  const [deleteID, setDeleteId] = React.useState('');
  const { isAuthenticated } = useAuth0();
  const [searchWord, setSearchWord] = useState<string>();
  const [pageNumber, setPageNumber] = useState(1);
  const buhinDispatch = useContext(BuhinDispatchContext);
  const [{ data: getData, loading: getLoading, error: getError }, getRefetch] = useFetch(apiRoutes.getGlyphs, {
    page: pageNumber,
    nameLike: searchWord,
  });
  const [{ data: deleteData, error: deleteError }, deleteExecute] = useFetch(apiRoutes.deleteGlyph(deleteID));
  const onPageChange = (page: number) => setPageNumber(page);

  const onClose = async (yes: boolean) => {
    if (yes) {
      await deleteExecute({ headers: await getAccessToken() }).catch(errorHandler);
      setDeleteId('');
      getRefetch().catch(errorHandler);
    }
    setOpen(false);
  };

  useEffect(() => setPageNumber(1), [searchWord]);
  useEffect(() => {
    getData && buhinDispatch({ type: 'setGlyphs', glyphs: getData });
  }, [getData, buhinDispatch]);
  useEffect(() => {
    deleteData && noticeDispatch({ type: 'open', message: deleteData.message, severity: 'success' });
  }, [deleteData, noticeDispatch]);
  useEffect(() => {
    deleteError && noticeDispatch({ type: 'open', message: deleteError.message, severity: 'error' });
  }, [deleteError, noticeDispatch]);

  const onDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = getData?.data.items?.map((glyph): { [key in Fields | 'key']: any } => ({
    key: `glyph_${glyph.id}`,
    name: glyph.name,
    glyph: <GlyphCanvas name={glyph.name} />,
    data: splitData(glyph.data),
    show: <IconButtonRouteLink to="/" icon={<DescriptionIcon />} />,
    delete: isAuthenticated && (
      <IconButton
        icon={<DeleteIcon />}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onClick={() => onDelete(glyph.id!)}
      />
    ),
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
        <SearchForm setSearchWord={setSearchWord} />
        <Divider />
        <ResponseNotice loading={getLoading} error={getError} />
        <Table<Fields>
          columns={columns}
          rows={rows}
          pageNumber={pageNumber}
          totalPages={getData?.data.meta?.totalPages}
          onPageChange={onPageChange}
        />
      </CardContent>
      {isAuthenticated && <Dialog open={open} onClose={onClose} title="グリフお本当に削除しますか？" />}
    </Card>
  );
};
