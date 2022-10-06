import { Circle } from '@chakra-ui/react';

type CircleIconProps = React.PropsWithChildren;

const CircleIcon = ({ children }: CircleIconProps) => (
  <Circle m={1} p={2} size={12} bg="red.400" color="white">
    {children}
  </Circle>
);

export default CircleIcon;
