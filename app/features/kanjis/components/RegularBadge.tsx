import { Badge } from '@chakra-ui/react';

type RegularBadgeProps = {
  regular: boolean;
};

const RegularBadge = ({ regular }: RegularBadgeProps) => (
  <>
    {regular ? (
      <Badge p={1} variant="solid" colorScheme="green">
        常用
      </Badge>
    ) : (
      <Badge p={1} variant="solid">
        常用外
      </Badge>
    )}
  </>
);

export default RegularBadge;
