import { Badge, Box, Divider, HStack, IconButton, Spacer, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { MdInfoOutline } from 'react-icons/md';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import { useShadow } from '../../../hooks/useColor';
import { type kanjiCodePointOrder } from '../models/kanji.server';
import JisLevelBadge from './JisLevelBadge';
import KanjiLink from './KanjiLink';
import KanjiRead from './KanjiRead';
import RegularBadge from './RegularBadge';

type KanjiItemProps = {
  kanji?: Awaited<ReturnType<typeof kanjiCodePointOrder>>[number];
  isEven: boolean;
};

const KanjiItem = ({ kanji, isEven }: KanjiItemProps) => {
  const bg = useColorModeValue(isEven ? 'purple.50' : 'purple.100', isEven ? 'whiteAlpha.0' : 'whiteAlpha.50');
  const shadow = useShadow();

  return (
    <HStack p={4} rounded="md" borderWidth="1px" shadow={shadow} bg={bg} justify="space-between" overflow="hidden">
      <KanjiLink codePoint={kanji?.code_point} />
      <GlyphCanvasSuspense />
      <Box p={4} borderWidth="1px" rounded="md" w="full" overflow="hidden">
        {kanji != null && (
          <VStack align="start">
            <HStack>
              <Text fontSize="sm">部首：</Text>
              {kanji.radical_code_point != null && (
                <Text fontSize="sm" m={4}>
                  {String.fromCodePoint(kanji.radical_code_point)}
                </Text>
              )}
            </HStack>
            <Divider />
            <HStack>
              <Text fontSize="sm">総画数：</Text>
              <Text fontSize="sm" m={4}>
                {kanji?.stroke_count}
              </Text>
            </HStack>
            <Divider />
            <HStack>
              <RegularBadge regular={kanji.regular} />
              {kanji.for_name && (
                <Badge p={1} variant="solid" colorScheme="blue">
                  人名用
                </Badge>
              )}
              <JisLevelBadge jisLevel={kanji.jis_level} />
            </HStack>
            <Divider />
            <KanjiRead reads={kanji.reads} />
          </VStack>
        )}
      </Box>
      <Spacer />
      <IconButton icon={<MdInfoOutline />} aria-label="kanji-detail" />
    </HStack>
  );
};

export default KanjiItem;
