import React from 'react';
import { AxiosError } from 'axios';
import Typography from '@material-ui/core/Typography';
import { ApiError } from '@sin-nihongo/api-interfaces';
import { ErrorTypography } from './Typography';

type Props = {
  loading?: boolean;
  error?: AxiosError<ApiError>;
};

export const ResponseNotice: React.FC<Props> = ({ loading, error }) => {
  return (
    <React.Fragment>
      {error && <ErrorTypography>{error.response?.data?.message}</ErrorTypography>}
      {loading && <Typography>検索中...</Typography>}
    </React.Fragment>
  );
};
