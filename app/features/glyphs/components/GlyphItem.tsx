import { Box, Divider, HStack, Spacer, VStack, useColorModeValue } from '@chakra-ui/react';
import { MdInfoOutline } from 'react-icons/md';
import { $path } from 'remix-routes';
import LinkButton from '~/components/LinkButton';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import KageElement from '~/features/kage/components/KageElement';
import { toDisplayKageData } from '~/features/kage/decorators';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { useShadow } from '~/hooks/useColor';
import { type GlyphItemData } from '../types';
import GlyphDeleteForm from './GlyphDeleteForm';

type GlyphItemProps = {
  glyph: GlyphItemData;
  isEven: boolean;
};

const GlyphItem = ({ glyph, isEven }: GlyphItemProps) => (
  <HStack
    p={4}
    rounded="md"
    borderWidth="1px"
    shadow={useShadow()}
    bg={useColorModeValue(isEven ? 'purple.50' : 'purple.100', isEven ? 'whiteAlpha.0' : 'whiteAlpha.50')}
    justify="space-between"
  >
    <GlyphCanvas {...getGlyphCanvasProps(glyph)} />
    <Box p={4} borderWidth="1px" rounded="md" w="full" overflow="hidden">
      <VStack align="start">
        <KageElement label="なまえ" data={glyph.name} />
        <Divider />
        <KageElement label="影算料" data={toDisplayKageData(glyph.data)} copyText={glyph.data ?? ''} />
      </VStack>
    </Box>
    <Spacer />
    <VStack>
      <LinkButton
        icon={<MdInfoOutline />}
        aria-label="glyph-detail"
        to={$path('/glyphs/:name', { name: glyph.name })}
        colorScheme="blue"
      />
      <GlyphDeleteForm glyph={glyph} />
    </VStack>
  </HStack>
);

export default GlyphItem;
