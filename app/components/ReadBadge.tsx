import { Badge, Center, WrapItem } from '@chakra-ui/react';

type ReadBadgeProps = {
  name: string;
};

const ReadBadge = ({ name }: ReadBadgeProps) => (
  <WrapItem h="fit-content" rounded="md" pl={1} pr={1}>
    <Center>
      <Badge colorScheme="purple" variant="solid">
        {name}
      </Badge>
    </Center>
  </WrapItem>
);

export default ReadBadge;
