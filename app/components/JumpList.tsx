import { Box, Heading, Link, VStack } from '@chakra-ui/react';
import React from 'react';
import { type GroupedVirtuosoHandle } from 'react-virtuoso';
import { HEADER_HEIGHT } from '~/styles/constants';

type JumpListProps = {
  label: string;
  virtuoso: React.RefObject<GroupedVirtuosoHandle>;
  headings: ReadonlyArray<React.ReactNode>;
};

const JumpList = ({ label, virtuoso, headings }: JumpListProps) => (
  <Box as="nav" w={{ base: 0, md: 40 }} display={{ base: 'none', md: 'block' }} ml={2} p={2}>
    <VStack align="start" pos="sticky" top={HEADER_HEIGHT + 4}>
      <Heading size="sm">{label}</Heading>
      <VStack align="start" w="full" maxH={`calc(100VH - ${HEADER_HEIGHT}rem)`} overflowY="auto">
        {headings.map((heading, index) => (
          <Link
            key={`jump-${index}`}
            onClick={() => {
              virtuoso?.current?.scrollToIndex({ index, offset: -HEADER_HEIGHT * 4 - 16 });
            }}
          >
            {heading}
          </Link>
        ))}
      </VStack>
    </VStack>
  </Box>
);

export default JumpList;
