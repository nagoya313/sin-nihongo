import { Box, Text } from '@chakra-ui/react';

type KageDataProps = {
  data: string;
};

const KageData = ({ data }: KageDataProps) => (
  <Box>
    {data.split('$').map((data, index) => (
      <Text key={index} fontSize="sm">
        {data}
      </Text>
    ))}
  </Box>
);

export default KageData;
