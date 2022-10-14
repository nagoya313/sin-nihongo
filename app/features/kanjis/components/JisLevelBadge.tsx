import { Badge } from '@chakra-ui/react';

type JisLevelBadgeProps = {
  jisLevel: 1 | 2;
};

const JisLevelBadge = ({ jisLevel }: JisLevelBadgeProps) =>
  jisLevel === 1 ? (
    <Badge p={1} variant="solid" colorScheme="red">
      第一水準
    </Badge>
  ) : (
    <Badge p={1} variant="solid">
      第二水準
    </Badge>
  );

export default JisLevelBadge;
