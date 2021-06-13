import React, { useContext, useEffect, Suspense } from 'react';
import { useSuspenseQuery } from 'react-fetching-library';
import { GetGlyphwikiRequest, GlyphResponse } from '@sin-nihongo/api-interfaces';
import { ResponseNotice } from '../../components/ResponseNotice';
import { ErrorTypography, SubText } from '../../components/Typography';
import { BuhinDispatchContext } from '../../providers/Buhin';
import { useFetch } from '../../utils/axios';
import { GlyphwikiContent } from './GlyphwikiContent';
import { useSuspenseApiQuery } from '../../apiClient';
import { fetchGlyphwiki } from '../../routes';

type Props = { params: GetGlyphwikiRequest };

export const SearchResult: React.FC<Props> = ({ params }) => {
  const { payload, error } = useSuspenseApiQuery(fetchGlyphwiki(params));
  const buhinDispatch = useContext(BuhinDispatchContext);

  /*useEffect(() => {
    data && buhinDispatch({ type: 'setGlyph', glyph: data });
  }, [data, buhinDispatch]);*/

  if (error) {
    return <ErrorTypography>{error.message}</ErrorTypography>;
  }

  console.log(error, payload);

  return (
    <React.Fragment>
      <GlyphwikiContent glyph={payload?.data} />
      <SubText>参照グリフ</SubText>
      {payload?.includeGlyphs?.map((glyph) => (
        <GlyphwikiContent key={glyph.name} glyph={glyph} />
      ))}
    </React.Fragment>
  );
};
