import { HStack, Text, VStack } from '@chakra-ui/react';
import ClipboardCopyButton from '~/components/ClipboardCopyButton';

type KageElementProps = {
  label: string;
  text: string;
  data: React.ReactNode;
};

const KageElement = ({ label, text, data }: KageElementProps) => (
  <HStack>
    <VStack align="start">
      <Text fontSize="sm">{label}：</Text>
      <ClipboardCopyButton text={text} />
    </VStack>
    <Text fontSize="sm" m={4}>
      {data}
    </Text>
  </HStack>
);

export default KageElement;
