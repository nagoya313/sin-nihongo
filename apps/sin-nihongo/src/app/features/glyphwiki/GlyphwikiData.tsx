import React from 'react';
import useAxios from 'axios-hooks';

export interface GlyphwikiData {
  readonly version: number;
  readonly name: string;
  readonly data: string;
  readonly related: string;
}

interface Props {
  readonly searchWord: string;
}

export const GlyphwikiData: React.FC<Props> = ({ searchWord }) => {
  const [{ data, loading, error }] = useAxios<GlyphwikiData>({
    baseURL: 'api/v1/glyphwiki',
    params: { q: searchWord },
  });

  return <React.Fragment></React.Fragment>;
};
