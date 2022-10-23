import { HStack } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import DataItem from '~/components/DataItem';
import DataList from '~/components/Datalist';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import KageData from '~/features/kage/components/KageData';
import { type Glyph } from '~/features/kage/types';

type GlyphResultProps = {
  glyph: Glyph;
  buhin: Buhin;
};

const GlyphData = ({ glyph, buhin }: GlyphResultProps) => (
  <HStack w="full">
    <GlyphCanvas name={glyph.name} buhin={buhin} />
    <DataList>
      <DataItem term="なまえ" definition={glyph.name} />
      <DataItem term="影算料" definition={<KageData data={glyph.data} />} />
    </DataList>
  </HStack>
);

export default GlyphData;
