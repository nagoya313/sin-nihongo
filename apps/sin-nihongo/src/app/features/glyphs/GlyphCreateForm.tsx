import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UseFormHandleSubmit } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { PostGlyphParamsBody } from '@sin-nihongo/sin-nihongo-params';
import { Form } from '../../components/Form';
import { getAccessTokenOptions } from '../../utils/auth0';
import { errorMessage, fetchWithTokenAndData, useFetch } from '../../utils/axios';
import { NoticeDispatchContext } from '../../providers/Notice';

type Props = {
  handleSubmit: UseFormHandleSubmit<any>;
};

export const GlyphCreateForm: React.FC<Props> = ({ handleSubmit, children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const noticeDispatch = useContext(NoticeDispatchContext);
  const history = useHistory();
  const [{ data, error }, execute] = useFetch(apiRoutes.postGlyph);

  const onSubmit = async (data: PostGlyphParamsBody) => {
    const token = await getAccessTokenSilently(getAccessTokenOptions);
    execute({ headers: { Authorization: `Bearer ${token}` }, data: { glyph: data } }).catch();
  };

  useEffect(() => {
    error && noticeDispatch({ type: 'open', message: errorMessage(error), severity: 'error' });
  }, [error, noticeDispatch]);

  useEffect(() => {
    if (data) {
      history.push('/glyphs');
      noticeDispatch({ type: 'open', message: data.message, severity: 'success' });
    }
  }, [data, history, noticeDispatch]);

  return <Form onSubmit={handleSubmit(onSubmit)}>{children}</Form>;
};
