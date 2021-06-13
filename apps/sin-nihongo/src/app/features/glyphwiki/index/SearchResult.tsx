import React, { useMemo } from 'react';
import { useSuspenseQuery } from 'react-fetching-library';
import { GetGlyphwikiRequest } from '@sin-nihongo/api-interfaces';
import { ErrorTypography, SubText } from '../../../components/Typography';
import { Content } from '../Content';
import { isErrorResponse } from '../../../apiClient';
import { fetchGlyphwiki } from '../../../routes';
import { glyphToBuhin } from '../../../utils/kageData';

type Props = { params: GetGlyphwikiRequest };

export const SearchResult: React.VFC<Props> = ({ params }) => {
  const request = useMemo(() => fetchGlyphwiki(params), [params]);
  const { payload } = useSuspenseQuery(request);

  if (isErrorResponse(payload)) {
    return <ErrorTypography>{payload.message}</ErrorTypography>;
  } else if (typeof payload === 'undefined') {
    throw Error;
  }

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
};
