import { Box, useColorModeValue } from '@chakra-ui/react';

type GroupLabelProps = {
  label: string;
};

const GroupLabel = ({ label }: GroupLabelProps) => (
  <Box p={4} bg={useColorModeValue('purple.200', 'purple.900')} rounded={4} w="full">
    {label}
  </Box>
);

export default GroupLabel;
