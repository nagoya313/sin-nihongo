import { Heading, Text } from '@chakra-ui/react';

type DataItemProps = {
  term: string;
  definition: React.ReactNode;
};

const DataItem = ({ term, definition }: DataItemProps) => (
  <>
    <Heading as="dt" size="sm" w="30%">
      {term}
    </Heading>
    <Text as="dd" w="70%">
      {definition}
    </Text>
  </>
);

export default DataItem;
