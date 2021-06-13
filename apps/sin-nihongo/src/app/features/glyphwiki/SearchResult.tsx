import React, { useContext, useEffect } from 'react';
import { GetGlyphwikiRequest } from '@sin-nihongo/api-interfaces';
import { ErrorTypography, SubText } from '../../components/Typography';
import { BuhinDispatchContext } from '../../providers/Buhin';
import { Content } from './Content';
import { useSuspenseApiQuery } from '../../apiClient';
import { fetchGlyphwiki } from '../../routes';

type Props = { params: GetGlyphwikiRequest };

export const SearchResult: React.FC<Props> = ({ params }) => {
  const { payload, error } = useSuspenseApiQuery(fetchGlyphwiki, params);
  const buhinDispatch = useContext(BuhinDispatchContext);

  useEffect(() => {
    payload && buhinDispatch({ type: 'setGlyph', glyph: payload });
  }, [payload, buhinDispatch]);

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
