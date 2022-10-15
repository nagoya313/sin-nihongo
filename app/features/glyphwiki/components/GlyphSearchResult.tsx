import { Divider, VStack } from '@chakra-ui/react';
import type useMatchesData from '~/hooks/useMatchesData';
import { glyphToBuhin } from '~/kage/kageData';
import { type loader } from '~/routes/glyphwiki';
import { type UnionSelect } from '~/utils/types';
import GlyphResult from './GlyphResult';

type GlyphSearchResultProps = {
  glyph: UnionSelect<ReturnType<typeof useMatchesData<typeof loader>>, 'glyph'>['glyph'];
};

const GlyphSearchResult = ({ glyph }: GlyphSearchResultProps) => {
  const buhin = glyphToBuhin(glyph);

  return (
    <VStack align="start" p={4} mt={4} rounded="md" borderWidth="1px">
      <GlyphResult name={glyph.name} buhin={buhin} />
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
