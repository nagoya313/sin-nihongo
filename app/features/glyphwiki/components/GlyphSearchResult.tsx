import { Divider, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { glyphsToBuhin } from '~/features/kage/models/kageData';
import { type loader } from '~/routes/glyphwiki';
import { type LoaderData, type UnionSelect } from '~/utils/types';
import GlyphResult from './GlyphResult';

type GlyphSearchResultProps = {
  glyphs: UnionSelect<LoaderData<typeof loader>, 'glyphs'>['glyphs'];
};

const GlyphSearchResult = ({ glyphs }: GlyphSearchResultProps) => {
  const buhin = glyphsToBuhin(glyphs);

  return (
    <VStack align="start" p={4} mt={4} rounded="md" borderWidth="1px">
      {glyphs.map((glyph, index) => (
        <Fragment key={glyph.name}>
          {index !== 0 && <Divider />}
          <GlyphResult glyph={glyph} buhin={buhin} q={glyphs[0]!.name} />
        </Fragment>
      ))}
    </VStack>
  );
};

export default GlyphSearchResult;
