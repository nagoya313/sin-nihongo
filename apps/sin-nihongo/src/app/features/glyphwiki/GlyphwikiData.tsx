import React, { useEffect } from 'react';
import useAxios from 'axios-hooks';
import { KageRecursionData } from '@sin-nihongo/api-interfaces';

interface Props {
  readonly searchWord: string;
  readonly onLoad: (data: KageRecursionData) => void;
}

export const GlyphwikiData: React.FC<Props> = ({ searchWord, onLoad }) => {
  const [{ data, loading, error }] = useAxios<KageRecursionData>({
    baseURL: 'api/v1/glyphwiki',
    params: { q: searchWord },
  });

  useEffect(() => {
    if (typeof data !== 'undefined') {
      onLoad(data);
    }
  }, [data]);

  return <React.Fragment></React.Fragment>;
};
