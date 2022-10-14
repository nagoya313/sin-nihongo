import { Center, Link as CUILink, Text, WrapItem } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { $path } from 'remix-routes';
import { useLinkColor } from '~/hooks/useColor';

type WordItemProps = {
  codePoint: number;
  to: '/radicals';
};

const WordItem = ({ codePoint, to }: WordItemProps) => (
  <WrapItem>
    <Center w="40px">
      <CUILink as={Link} to={$path(`${to}/:codePoint`, { codePoint })} color={useLinkColor()}>
        <Text fontSize="xl" fontWeight="bold">
          {String.fromCodePoint(codePoint)}
        </Text>
      </CUILink>
    </Center>
  </WrapItem>
);

export default WordItem;
