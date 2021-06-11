import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import { GlyphCanvas } from '../../components/GlyphCanvas';
import { IconButton } from '../../components/IconButton';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { Table } from '../../components/Table';
import { ResponseNotice } from '../../components/ResponseNotice';
import { splitData } from '../../utils/kageData';
import { BuhinDispatchContext } from '../../providers/Buhin';
import { GlyphsDataContext } from './GlyphsProvider';
import { useDispatch, usePage } from './GlyphsProvider';

type Fields = 'glyph' | 'name' | 'data' | 'show' | 'delete';

const columns: { field: Fields; headerName: string }[] = [
  { field: 'name', headerName: '名前' },
  { field: 'glyph', headerName: '生成グリフ' },
  { field: 'data', headerName: 'KAGEデータ' },
  { field: 'show', headerName: '' },
  { field: 'delete', headerName: '' },
];

export const GlyphsTable: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const buhinDispatch = useContext(BuhinDispatchContext);
  const page = usePage();
  const dispatch = useDispatch();
  const { data, loading, error } = useContext(GlyphsDataContext);
  const onDelete = (id: string) => dispatch({ type: 'OPEN_DELETE_DIALOG', id: id });
  const onPageChange = (page: number) => dispatch({ type: 'PAGE_CHANGE', page: page });

  console.log('グリフテーブル');

  useEffect(() => {
    data && buhinDispatch({ type: 'setGlyphs', glyphs: data });
  }, [data, buhinDispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = data?.data.items?.map((glyph): { [key in Fields | 'key']: any } => ({
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
    <React.Fragment>
      <ResponseNotice loading={loading} error={error} />
      <Table
        columns={columns}
        rows={rows}
        pageNumber={page}
        totalPages={data?.data.meta?.totalPages}
        onPageChange={onPageChange}
      />
    </React.Fragment>
  );
};
