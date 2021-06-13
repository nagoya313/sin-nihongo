import React from 'react';
import { GetGlyphwikiRequest } from '@sin-nihongo/api-interfaces';
import { ErrorTypography, SubText } from '../../components/Typography';
import { Content } from './Content';
import { useSuspenseApiQuery } from '../../apiClient';
import { fetchGlyphwiki } from '../../routes';
import { glyphToBuhin } from '../../utils/kageData';

type Props = { params: GetGlyphwikiRequest };

export const SearchResult: React.VFC<Props> = ({ params }) => {
  const { payload, error } = useSuspenseApiQuery(fetchGlyphwiki, params);

  if (payload) {
    const buhin = glyphToBuhin(payload);
    return (
      <>
        <Content glyph={payload.data} buhin={buhin} />
        <SubText>参照グリフ</SubText>
        {payload?.includeGlyphs?.map((glyph) => (
          <Content key={glyph.name} glyph={glyph} buhin={buhin} />
        ))}
      </>
    );
  }

  if (error) {
    return <ErrorTypography>{error.message}</ErrorTypography>;
  }

  throw Error;
};
