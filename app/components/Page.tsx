import { Heading, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import CircleIcon from './CircleIcon';
import Main from './Main';

type PageProps = React.PropsWithChildren<{
  avatar: React.ReactNode;
  title: string;
  subText?: string;
  action?: React.ReactNode;
}>;

const Page = ({ avatar, title, subText, action, children }: PageProps) => (
  <Main>
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
    {children}
  </Main>
);

export default Page;
