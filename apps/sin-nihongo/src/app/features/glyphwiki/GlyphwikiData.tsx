import React, { useEffect } from 'react';
import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import Typography from '@material-ui/core/Typography';
import { Error, KageRecursionData } from '@sin-nihongo/api-interfaces';
import styled from 'styled-components';

interface Props {
  readonly searchWord: string;
  readonly onLoad: (data: KageRecursionData | undefined) => void;
}

const errorMessage = (error: AxiosError<Error> | undefined) => {
  return error?.response?.data?.message;
};

const ErrorTypography = styled(Typography)`
  color: red;
`;

export const GlyphwikiData: React.FC<Props> = ({ searchWord, onLoad }) => {
  const [{ data, loading, error }] = useAxios<KageRecursionData, Error>(
    {
      baseURL: 'api/v1/glyphwiki',
      params: { q: searchWord },
    },
    { useCache: false }
  );

  useEffect(() => {
    if (!loading) {
      if (error) {
        onLoad(undefined);
      } else if (typeof data !== 'undefined') {
        onLoad(data);
      }
    }
  }, [data, loading, error]);

  if (error) {
    return <ErrorTypography>{error.response?.data?.message}</ErrorTypography>;
  }

  if (loading) {
    return <Typography>検索中...</Typography>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
