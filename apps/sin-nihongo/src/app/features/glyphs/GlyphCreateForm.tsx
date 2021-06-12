import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UseFormHandleSubmit } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { apiRoutes } from '@sin-nihongo/api-interfaces';
import { PostGlyphParamsBody } from '@sin-nihongo/sin-nihongo-params';
import { Form } from '../../components/Form';
import { useDisplayNotice } from '../../components/Notice';
import { getAccessTokenOptions } from '../../utils/auth0';
import { errorMessage, useFetch } from '../../utils/axios';

type Props = {
  handleSubmit: UseFormHandleSubmit<PostGlyphParamsBody>;
};

export const GlyphCreateForm: React.FC<Props> = ({ handleSubmit, children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { displayError, displaySuccess } = useDisplayNotice();
  const history = useHistory();
  const [{ data, error }, execute] = useFetch(apiRoutes.postGlyph);

  const onSubmit = async (data: PostGlyphParamsBody) => {
    const token = await getAccessTokenSilently(getAccessTokenOptions);
    execute({ headers: { Authorization: `Bearer ${token}` }, data: { glyph: data } }).catch();
  };

  useEffect(() => {
    error && displayError(errorMessage(error));
  }, [error, displayError]);

  useEffect(() => {
    if (data) {
      history.push('/glyphs');
      displaySuccess(data.message);
    }
  }, [data, history, displaySuccess]);

  return <Form onSubmit={handleSubmit(onSubmit)}>{children}</Form>;
};
