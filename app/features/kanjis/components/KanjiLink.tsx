import { Center, Skeleton, Text } from '@chakra-ui/react';

type KanjiLinkProps = {
  codePoint?: number;
};

const KanjiLink = ({ codePoint }: KanjiLinkProps) => (
  <Center w="80px" h="80px" m={4}>
    {codePoint != null ? (
      <Text fontSize="xl" fontWeight="bold">
        {String.fromCodePoint(codePoint)}
      </Text>
    ) : (
      <Skeleton w="full" h="full" />
    )}
  </Center>
);

export default KanjiLink;
