import { Box, Heading, HStack, LinkBox, Text, useColorModeValue, WrapItem } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import CircleIcon from '~/components/CircleIcon';

type NavCardProps = {
  avatar: React.ReactNode;
  title: string;
  description: string;
  to: string;
};

const NavCard = ({ avatar, title, description, to }: NavCardProps) => (
  <WrapItem>
    <Box
      borderWidth={useColorModeValue('1px', undefined)}
      p={4}
      w={80}
      rounded="md"
      bg={useColorModeValue('white', 'gray.700')}
      shadow={useColorModeValue('md', undefined)}
    >
      <LinkBox as="article">
        <Link to={to}>
          <HStack>
            <CircleIcon>{avatar}</CircleIcon>
            <Heading size="sm">{title}</Heading>
          </HStack>
        </Link>
      </LinkBox>
      <Text mt={4}>{description}</Text>
    </Box>
  </WrapItem>
);

export default NavCard;
