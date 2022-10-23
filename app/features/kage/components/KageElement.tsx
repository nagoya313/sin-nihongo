import { HStack, Text, type TextProps, VStack } from '@chakra-ui/react';
import ClipboardCopyButton from '~/components/ClipboardCopyButton';

type KageElementProps = {
  label: string;
  data: string;
  copyText?: string;
  color?: TextProps['color'];
};

const KageElement = ({ label, data, copyText = data, color }: KageElementProps) => (
  <HStack>
    <VStack align="start">
      <Text fontSize="sm">{label}：</Text>
      <ClipboardCopyButton text={copyText} />
    </VStack>
    <Text fontSize="sm" m={4} color={color} whiteSpace="pre">
      {data}
    </Text>
  </HStack>
);

export default KageElement;
