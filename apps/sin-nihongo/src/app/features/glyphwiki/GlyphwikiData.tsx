import React, { useEffect } from 'react';
import useAxios from 'axios-hooks';
import Typography from '@material-ui/core/Typography';
import { Error, KageRecursionData } from '@sin-nihongo/api-interfaces';
import styled from 'styled-components';

interface Props {
  readonly searchWord: string;
  readonly onLoad: (data: KageRecursionData | undefined) => void;
}

const ErrorTypography = styled(Typography)`
  color: red;
`;

export const GlyphwikiData: React.FC<Props> = ({ searchWord, onLoad }) => {
  const [{ data, loading, error }] = useAxios<KageRecursionData, Error>(
    {
      baseURL: 'api/v1/glyphwiki',
      method: 'GET', // prodでビルドするとこゝを明示的に指定しないとtoUpperCase undefinedエラーになる
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
