import { Badge } from '@chakra-ui/react';

type RegularBadgeProps = {
  regular: boolean;
};

const RegularBadge = ({ regular }: RegularBadgeProps) => (
  <Badge p={1} variant="solid" colorScheme={regular ? 'green' : undefined}>
    {regular ? '常用' : '常用外'}
  </Badge>
);

export default RegularBadge;
