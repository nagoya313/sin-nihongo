import { Flex } from '@chakra-ui/react';

type DataListProps = React.PropsWithChildren;

const DataList = ({ children }: DataListProps) => (
  <Flex as="dl" wrap="wrap" p={4}>
    {children}
  </Flex>
);

export default DataList;
