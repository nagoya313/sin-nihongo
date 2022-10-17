import { Flex, Heading, Link as CUILink, Text } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { $path } from 'remix-routes';
import { useLinkColor } from '~/hooks/useColor';
import { HIRAGANA_MATCHER } from '~/utils/schemas/regex';
import { type getKanjiByCodePoint } from '../models/kanji.server';

type RadicalDefineProps = {
  kanji: NonNullable<Awaited<ReturnType<typeof getKanjiByCodePoint>>>;
  sames: ReadonlyArray<string>;
};

const KanjiDefine = ({ kanji, sames }: RadicalDefineProps) => (
  <Flex as="dl" wrap="wrap" p={4}>
    <Heading as="dt" size="sm" w="30%">
      画数
    </Heading>
    <Text as="dd" w="70%">
      {kanji.stroke_count}
    </Text>
    <Heading as="dt" size="sm" w="30%">
      音読み
    </Heading>
    <Text as="dd" w="70%">
      {kanji.reads.filter((read) => read.match(HIRAGANA_MATCHER)).join('　')}
    </Text>
    <Heading as="dt" size="sm" w="30%">
      訓読み
    </Heading>
    <Text as="dd" w="70%">
      {kanji.reads.filter((read) => !read.match(HIRAGANA_MATCHER)).join('　')}
    </Text>
    <Heading as="dt" size="sm" w="30%">
      部首
    </Heading>
    <Text as="dd" w="70%">
      <CUILink
        as={Link}
        to={$path('/radicals/:codePoint', { codePoint: kanji.radical_code_point })}
        color={useLinkColor()}
      >
        {kanji.radical}
      </CUILink>
    </Text>
    <Heading as="dt" size="sm" w="30%">
      統合
    </Heading>
    <Text as="dd" w="70%">
      {sames.join('　')}
    </Text>
  </Flex>
);

export default KanjiDefine;
