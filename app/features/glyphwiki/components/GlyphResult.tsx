import { Box, Button, Divider, HStack, Text, useClipboard, VStack } from '@chakra-ui/react';
import { Buhin } from '@kurgm/kage-engine';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';

type GlyphResultProps = {
  name: string;
  buhin: Buhin;
};

const GlyphResult = ({ name, buhin }: GlyphResultProps) => {
  const data = buhin.search(name);
  const { hasCopied: hasNameCopied, onCopy: onNameCopy } = useClipboard(name);
  const { hasCopied: hasDataCopied, onCopy: onDataCopy } = useClipboard(data);

  return (
    <HStack w="full">
      <GlyphCanvasSuspense name={name} buhin={buhin} />
      <VStack align="start">
        <HStack>
          <VStack align="start">
            <Text fontSize="sm">なまえ：</Text>
            <Button size="xs" onClick={onNameCopy}>
              {hasNameCopied ? '複製了' : '複製'}
            </Button>
          </VStack>
          <Text fontSize="sm" m={4}>
            {name}
          </Text>
        </HStack>
        <Divider />
        <HStack>
          <VStack align="start">
            <Text fontSize="sm">影算料：</Text>
            <Button size="xs" onClick={onDataCopy}>
              {hasDataCopied ? '複製了' : '複製'}
            </Button>
          </VStack>
          <Box>
            {data.split('$').map((data) => (
              <Text fontSize="sm">{data}</Text>
            ))}
          </Box>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default GlyphResult;
