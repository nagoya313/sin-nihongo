import { Box, Text, type TextProps } from '@chakra-ui/react';

type KageDataProps = {
  data: string;
  color?: TextProps['color'];
};

const KageData = ({ data, color }: KageDataProps) => (
  <Box>
    {data.split('$').map((data, index) => (
      <Text key={index} fontSize="sm" color={color}>
        {data}
      </Text>
    ))}
  </Box>
);

export default KageData;
