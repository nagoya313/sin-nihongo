import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { GlyphForm, GlyphParams, Message } from '@sin-nihongo/api-interfaces';
import { Form } from '../../components/Form';
import { getAccessTokenOptions } from '../../utils/auth0';
import { errorMessage, fetchWithTokenAndData, useLazyAxiosPost } from '../../utils/axios';
import { NoticeDispatchContext } from '../../providers/Notice';

export const GlyphCreateForm: React.FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const noticeDispatch = useContext(NoticeDispatchContext);
  const { handleSubmit } = useFormContext();
  const history = useHistory();
  const [{ data, error }, execute] = useLazyAxiosPost<Message>('api/v1/glyphs');

  const onSubmit = async (data: GlyphForm) => {
    const token = await getAccessTokenSilently(getAccessTokenOptions);
    fetchWithTokenAndData(execute, token, new GlyphParams(data));
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
