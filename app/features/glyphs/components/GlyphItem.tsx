import { Box, Divider, HStack, Spacer, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import GlyphCanvasSuspense from '~/features/kage/components/GlyphCanvasSuspense';
import KageData from '~/features/kage/components/KageData';
import { getGlyphCanvasProps, type DrawableGlyph } from '~/features/kage/models/kageData';
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
    <GlyphCanvasSuspense {...getGlyphCanvasProps(glyph)} />
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
    <GlyphDeleteForm name={glyph.name} />
  </HStack>
);

export default GlyphItem;
