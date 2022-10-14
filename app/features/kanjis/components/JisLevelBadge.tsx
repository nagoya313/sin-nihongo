import { Badge } from '@chakra-ui/react';

type JisLevelBadgeProps = {
  jisLevel: 1 | 2;
};

const JisLevelBadge = ({ jisLevel }: JisLevelBadgeProps) => (
  <Badge p={1} variant="solid" colorScheme={jisLevel === 1 ? 'red' : undefined}>
    第{jisLevel === 1 ? '一' : '二'}水準
  </Badge>
);

export default JisLevelBadge;
