import React, { useContext, useEffect } from 'react';
import { GlyphResponse } from '@sin-nihongo/api-interfaces';
import { ResponseNotice } from '../../components/ResponseNotice';
import { SubText } from '../../components/SubText';
import { BuhinDispatchContext } from '../../providers/Buhin';
import { useAxiosGet } from '../../utils/axios';
import { GlyphwikiContent } from './GlyphwikiContent';

type Props = {
  name: string;
};

export const GlyphwikiSearch: React.FC<Props> = ({ name }) => {
  const [{ data, loading, error }] = useAxiosGet<GlyphResponse>('api/v1/glyphwiki', {
    params: { q: name },
  });
  const buhinDispatch = useContext(BuhinDispatchContext);

  useEffect(() => {
    data && buhinDispatch({ type: 'setGlyph', glyph: data });
  }, [data, buhinDispatch]);

  return (
    <React.Fragment>
      <ResponseNotice loading={loading} error={error} />
      {data && (
        <React.Fragment>
          <GlyphwikiContent name={data.name} data={data.data} />
          <SubText>参照グリフ</SubText>
          {data.includeGlyphs?.map((glyph) => (
            <GlyphwikiContent key={glyph.name} name={glyph.name} data={glyph.data} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
