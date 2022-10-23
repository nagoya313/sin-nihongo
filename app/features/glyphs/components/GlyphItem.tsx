import { Box, Divider, HStack, Spacer, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { MdInfoOutline } from 'react-icons/md';
import { $path } from 'remix-routes';
import LinkButton from '~/components/LinkButton';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import KageData from '~/features/kage/components/KageData';
import { type DrawableGlyph, getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { useShadow } from '../../../hooks/useColor';
import GlyphDeleteForm from './GlyphDeleteForm';

type GlyphItemProps = {
  glyph: DrawableGlyph;
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
        <HStack>
          <Text fontSize="sm">なまえ：</Text>
          <Text fontSize="sm" m={4}>
            {glyph.name}
          </Text>
        </HStack>
        <Divider />
        <HStack>
          <Text fontSize="sm">影算料：</Text>
          <KageData data={glyph.data} />
        </HStack>
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
      <GlyphDeleteForm name={glyph.name} />
    </VStack>
  </HStack>
);

export default GlyphItem;
