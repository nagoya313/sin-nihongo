import { Heading, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import CircleIcon from './CircleIcon';

type PageInfoProps = {
  avatar: React.ReactNode;
  title: string;
  subText?: string;
  action?: React.ReactNode;
};

const PageInfo = ({ avatar, title, subText, action }: PageInfoProps) => (
  <HStack spacing={4} mt={8}>
    <CircleIcon>{avatar}</CircleIcon>
    <VStack align="start">
      <Heading size="sm">{title}</Heading>
      {subText && (
        <Text fontSize="xs" color="gray">
          {subText}
        </Text>
      )}
    </VStack>
    {action && (
      <>
        <Spacer />
        {action}
      </>
    )}
  </HStack>
);

export default PageInfo;
