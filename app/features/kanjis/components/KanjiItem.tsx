import { Box, Divider, HStack, Spacer, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { MdInfoOutline } from 'react-icons/md';
import { $path } from 'remix-routes';
import LinkButton from '~/components/LinkButton';
import RadicalLink from '~/features/radicals/components/RadicalLink';
import { useShadow } from '~/hooks/useColor';
import { type QueryResultData } from '~/utils/types';
import { type getDrawableKanjis } from '../repositories.server';
import EditableGlyphPopover from './EditableGlyphPopover';
import KanjiBadges from './KanjiBadges';
import KanjiRead from './KanjiRead';

type KanjiItemProps = {
  kanji: QueryResultData<typeof getDrawableKanjis>[number];
  isEven: boolean;
};

const KanjiItem = ({ kanji, isEven }: KanjiItemProps) => (
  <HStack
    p={4}
    rounded="md"
    borderWidth="1px"
    shadow={useShadow()}
    bg={useColorModeValue(isEven ? 'purple.50' : 'purple.100', isEven ? 'whiteAlpha.0' : 'whiteAlpha.50')}
    justify="space-between"
  >
    <EditableGlyphPopover key={kanji.code_point} kanji={kanji} />
    <Box p={4} borderWidth="1px" rounded="md" w="full" overflow="hidden">
      <VStack align="start">
        <HStack>
          <Text fontSize="sm">部首：</Text>
          <RadicalLink codePoint={kanji.radical_code_point} />
        </HStack>
        <Divider />
        <HStack>
          <Text fontSize="sm">総画数：</Text>
          <Text fontSize="sm" m={4}>
            {kanji?.stroke_count}
          </Text>
        </HStack>
        <Divider />
        <KanjiBadges kanji={kanji} />
        <Divider />
        <KanjiRead reads={kanji.reads} />
      </VStack>
    </Box>
    <Spacer />
    <LinkButton
      icon={<MdInfoOutline />}
      aria-label="kanji-detail"
      to={$path('/kanjis/:code_point', { code_point: kanji.code_point })}
    />
  </HStack>
);

export default KanjiItem;
