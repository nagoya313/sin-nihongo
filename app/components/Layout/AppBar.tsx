import { Avatar, Flex, HStack, Heading, IconButton, LinkBox, useColorModeValue } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useSetAtom } from 'jotai';
import { MdMenu } from 'react-icons/md';
import { $path } from 'remix-routes';
import { openSidebarAtom } from '~/atoms/sidebarAtom';
import { HEADER_HEIGHT } from '~/styles/constants';
import AuthButton from './AuthButton';
import ColorChangeButton from './ColorChangeButton';

const AppBar = () => (
  <Flex
    as="header"
    zIndex={3}
    bg={useColorModeValue('white', 'gray.800')}
    h={HEADER_HEIGHT}
    align="center"
    justify="space-between"
    px={4}
    pos="fixed"
    width="full"
    shadow={useColorModeValue('md', undefined)}
    borderBottomWidth="1px"
  >
    <IconButton
      onClick={useSetAtom(openSidebarAtom)}
      aria-label="open menu"
      icon={<MdMenu />}
      color="gray.400"
      display={{ base: 'flex', md: 'none' }}
      variant="ghost"
    />
    <LinkBox as="article">
      <Link to={$path('/')}>
        <HStack>
          <Avatar size="sm" src="/favicon.ico" display={{ base: 'none', md: 'block' }} />
          <Heading as="h4" size="md">
            新日本語
          </Heading>
        </HStack>
      </Link>
    </LinkBox>
    <HStack p={4}>
      <ColorChangeButton />
      <AuthButton />
    </HStack>
  </Flex>
);

export default AppBar;
