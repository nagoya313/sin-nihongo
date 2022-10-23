import { HStack } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { $path } from 'remix-routes';
import DataItem from '~/components/DataItem';
import DataList from '~/components/Datalist';
import TextLink from '~/components/TextLink';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import { toDisplayKageData } from '~/features/kage/decorators';
import { type Glyph } from '~/features/kage/types';

type GlyphResultProps = {
  glyph: Glyph & { kanjis: ReadonlyArray<{ code_point: number; kanji: string }> };
  buhin: Buhin;
};

const GlyphData = ({ glyph, buhin }: GlyphResultProps) => (
  <HStack w="full">
    <GlyphCanvas name={glyph.name} buhin={buhin} />
    <DataList>
      <DataItem term="なまえ" definition={glyph.name} isCopyable />
      <DataItem term="影算料" definition={toDisplayKageData(glyph.data)} isCopyable copyText={glyph.data} />
      <DataItem
        term="採用漢字"
        definition={glyph.kanjis.map(({ code_point, kanji }) => (
          <TextLink key={code_point} to={$path('/kanjis/:code_point', { code_point })} text={kanji} />
        ))}
      />
    </DataList>
  </HStack>
);

export default GlyphData;
