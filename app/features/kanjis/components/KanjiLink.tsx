import { Center, Text } from '@chakra-ui/react';
import ExternalLink from '~/components/ExternalLink';

type KanjiLinkProps = {
  codePoint: number;
};

const KanjiLink = ({ codePoint }: KanjiLinkProps) => (
  <Center w="80px" h="80px" m={4}>
    <ExternalLink href={`https://glyphwiki.org/wiki/u${codePoint.toString(16).padStart(4, '0')}`}>
      <Text fontSize="xl" fontWeight="bold">
        {String.fromCodePoint(codePoint)}
      </Text>
    </ExternalLink>
  </Center>
);

export default KanjiLink;
