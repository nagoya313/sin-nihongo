import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { Buhin } from '@kurgm/kage-engine';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';

type GlyphResultProps = {
  name: string;
  buhin: Buhin;
};

const GlyphResult = ({ name, buhin }: GlyphResultProps) => (
  <HStack w="full">
    <GlyphCanvasSuspense name={name} buhin={buhin} />
    <VStack align="start" w="full">
      <HStack>
        <Text fontSize="sm">なまえ：</Text>
        <Text fontSize="sm" m={4}>
          {name}
        </Text>
      </HStack>
      <Divider />
      <HStack>
        <Text fontSize="sm">影算料：</Text>
        <Box>
          {buhin
            .search(name)
            .split('$')
            .map((data) => (
              <Text fontSize="sm">{data}</Text>
            ))}
        </Box>
      </HStack>
    </VStack>
  </HStack>
);

export default GlyphResult;
