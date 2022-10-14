import { HStack, Text } from '@chakra-ui/react';

type KanjiReadStackProps = {
  label: string;
  reads: ReadonlyArray<string>;
};

const KanjiReadStack = ({ label, reads }: KanjiReadStackProps) => (
  <HStack>
    <Text fontSize="sm">{label}</Text>
    {reads.map((read) => (
      <Text key={read}>{read}</Text>
    ))}
  </HStack>
);

export default KanjiReadStack;
