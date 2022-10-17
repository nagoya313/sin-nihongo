import {
  Badge,
  Box,
  Divider,
  HStack,
  Link as CUILink,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { MdInfoOutline } from 'react-icons/md';
import { $path } from 'remix-routes';
import LinkButton from '~/components/LinkButton';
import { useLinkColor, useShadow } from '../../../hooks/useColor';
import { type getKanjis } from '../models/kanji.server';
import EditableGlyphPopover from './EditableGlyphPopover';
import JisLevelBadge from './JisLevelBadge';
import KanjiRead from './KanjiRead';
import RegularBadge from './RegularBadge';

type KanjiItemProps = {
  kanji: Awaited<ReturnType<typeof getKanjis>>[number];
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
    <EditableGlyphPopover kanji={kanji} />
    <Box p={4} borderWidth="1px" rounded="md" w="full" overflow="hidden">
      <VStack align="start">
        <HStack>
          <Text fontSize="sm">部首：</Text>
          <CUILink
            as={Link}
            to={$path('/radicals/:codePoint', { codePoint: kanji.radical_code_point })}
            color={useLinkColor()}
          >
            {String.fromCodePoint(kanji.radical_code_point)}
          </CUILink>
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
    </Box>
    <Spacer />
    <LinkButton
      icon={<MdInfoOutline />}
      aria-label="kanji-detail"
      to={$path('/kanjis/:codePoint', { codePoint: kanji.code_point })}
    />
  </HStack>
);

export default KanjiItem;
