import { Divider, VStack } from '@chakra-ui/react';
import type useMatchesData from '~/hooks/useMatchesData';
import { glyphToBuhin } from '~/kage/kageData';
import { type loader } from '~/routes/glyphwiki';
import GlyphResult from './GlyphResult';

type GlyphSearchResultProps = {
  glyph: Extract<ReturnType<typeof useMatchesData<typeof loader>>, { glyph: unknown }>['glyph'];
};

const GlyphSearchResult = ({ glyph }: GlyphSearchResultProps) => {
  const buhin = glyphToBuhin(glyph);

  return (
    <VStack align="start" p={4} mt={4} rounded="md" borderWidth="1px">
      <GlyphResult name={glyph.name} buhin={buhin} />
      <Divider />
      {glyph.drawNecessaryGlyphs.map(({ name }) => (
        <>
          <Divider />
          <GlyphResult name={name} buhin={buhin} />
        </>
      ))}
    </VStack>
  );
};

export default GlyphSearchResult;
