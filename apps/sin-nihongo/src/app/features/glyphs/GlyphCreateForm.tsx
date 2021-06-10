import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UseFormHandleSubmit } from 'react-hook-form';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { PostGlyphParamsBody } from '@sin-nihongo/sin-nihongo-params';
import { Form } from '../../components/Form';
import { errorMessage, errorHandler, useFetch } from '../../utils/axios';
import { NoticeDispatchContext } from '../../providers/Notice';
import { useAccessToken } from '../../utils/auth0';

type Props = {
  handleSubmit: UseFormHandleSubmit<PostGlyphParamsBody>;
};

export const GlyphCreateForm: React.FC<Props> = ({ handleSubmit, children }) => {
  const getAccessToken = useAccessToken();
  const noticeDispatch = useContext(NoticeDispatchContext);
  const history = useHistory();
  const [{ data, error }, execute] = useFetch(apiRoutes.postGlyph);

  const onSubmit = async (data: PostGlyphParamsBody) => {
    execute({ headers: await getAccessToken(), data: { glyph: data } }).catch(errorHandler);
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
