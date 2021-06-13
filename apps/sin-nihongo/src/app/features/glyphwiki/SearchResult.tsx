import React, { useContext, useEffect } from 'react';
import { GetGlyphwikiRequest } from '@sin-nihongo/api-interfaces';
import { useSetGlyphBuhin } from '../../components/Buhin';
import { ErrorTypography, SubText } from '../../components/Typography';
import { Content } from './Content';
import { useSuspenseApiQuery } from '../../apiClient';
import { fetchGlyphwiki } from '../../routes';

type Props = { params: GetGlyphwikiRequest };

export const SearchResult: React.FC<Props> = ({ params }) => {
  const { payload, error } = useSuspenseApiQuery(fetchGlyphwiki, params);
  const setGlyphBuhin = useSetGlyphBuhin();

  useEffect(() => {
    payload && setGlyphBuhin(payload);
  }, [payload, setGlyphBuhin]);

  if (payload) {
    return (
      <>
        <Content glyph={payload.data} />
        <SubText>参照グリフ</SubText>
        {payload?.includeGlyphs?.map((glyph) => (
          <Content key={glyph.name} glyph={glyph} />
        ))}
      </>
    );
  }

  if (error) {
    return <ErrorTypography>{error.message}</ErrorTypography>;
  }

  throw Error;
};
