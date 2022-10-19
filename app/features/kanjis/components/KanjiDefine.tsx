import { Flex, Heading, Text } from '@chakra-ui/react';
import RadicalLink from '~/features/radicals/components/RadicalLink';
import { HIRAGANA_MATCHER } from '~/utils/schemas/regex';
import { type getKanjiByCodePoint } from '../models/kanji.server';

type KanjiDefineProps = {
  kanji: NonNullable<Awaited<ReturnType<typeof getKanjiByCodePoint>>>;
  sames: ReadonlyArray<string>;
};

const KanjiDefine = ({ kanji, sames }: KanjiDefineProps) => (
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
      <RadicalLink codePoint={kanji.radical_code_point} />
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
