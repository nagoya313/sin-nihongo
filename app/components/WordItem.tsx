import { Center, Text, WrapItem } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { $path } from 'remix-routes';

type WordItemProps = {
  codePoint: number;
};

const WordItem = ({ codePoint }: WordItemProps) => (
  <WrapItem>
    <Center w="40px">
      <Link to={$path('/radicals')}>
        <Text fontSize="xl" fontWeight="bold">
          {String.fromCodePoint(codePoint)}
        </Text>
      </Link>
    </Center>
  </WrapItem>
);

export default WordItem;
