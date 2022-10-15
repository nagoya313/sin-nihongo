import { Box, Divider, HStack, Spacer, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import { type getGlyphs } from '~/features/glyphs/models/glyph.server';
import { glyphToBuhin } from '~/kage/kageData';
import { useShadow } from '../../../hooks/useColor';

type GlyphItemProps = {
  glyph: Awaited<ReturnType<typeof getGlyphs>>[number];
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
    <GlyphCanvasSuspense name={glyph.name} buhin={glyphToBuhin(glyph)} />
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
          <Box>
            {glyph.data.split('$').map((data, index) => (
              <Text key={index} fontSize="sm">
                {data}
              </Text>
            ))}
          </Box>
        </HStack>
      </VStack>
    </Box>
    <Spacer />
  </HStack>
);

export default GlyphItem;
