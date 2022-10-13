import { Box } from '@chakra-ui/react';

type MainProps = React.PropsWithChildren;

const Main = ({ children }: MainProps) => (
  <Box as="main" flex={1} p={8}>
    {children}
  </Box>
);

export default Main;
