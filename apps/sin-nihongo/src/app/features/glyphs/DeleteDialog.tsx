import React, { useContext, useEffect } from 'react';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { Dialog } from '../../components/Dialog';
import { NoticeDispatchContext } from '../../providers/Notice';
import { errorHandler, useFetch } from '../../utils/axios';
import { useAccessToken } from '../../utils/auth0';
import { GlyphsContext, GlyphsDispatchContext, useDispatch } from './GlyphsProvider';

export const DeleteDialog: React.VFC = () => {
  console.log('削除ダイアログ');
  const store = useContext(GlyphsContext);
  const dispatch = useDispatch();
  const getAccessToken = useAccessToken();
  const noticeDispatch = useContext(NoticeDispatchContext);
  const [{ data, error }, execute] = useFetch(apiRoutes.deleteGlyph(store.deleteId));

  const onClose = async (yes: boolean) => {
    if (yes) {
      await execute({ headers: await getAccessToken() }).catch(errorHandler);
      dispatch({ type: 'DELTE_GLYPH' });
    } else {
      dispatch({ type: 'CLOSE_DELETE_DIALOG' });
    }
  };

  useEffect(() => {
    data && noticeDispatch({ type: 'open', message: data.message, severity: 'success' });
  }, [data, noticeDispatch]);
  useEffect(() => {
    error && noticeDispatch({ type: 'open', message: error.message, severity: 'error' });
  }, [error, noticeDispatch]);

  return <Dialog open={store.deleteDialogOpen} onClose={onClose} title="グリフお本当に削除しますか？" />;
};
