import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { closeSidebarAtom, isOpenSidebarAtom } from '~/atoms/sidebarAtom';
import AppBar from '~/components/AppBar';
import Footer from '~/components/Footer';
import SideBar from '~/components/Sidebar';
import { HEADER_HEIGHT } from '~/styles/constants';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const isOpen = useAtomValue(isOpenSidebarAtom);
  const onClose = useSetAtom(closeSidebarAtom);

  return (
    <>
      <AppBar />
      <Box h={HEADER_HEIGHT} />
      <VStack
        p={2}
        w={{ base: 'full', md: 80 }}
        pos="fixed"
        h="full"
        borderRightWidth="1px"
        display={{ base: 'none', md: 'block' }}
      >
        <SideBar />
      </VStack>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Avatar size="sm" src="/favicon.ico" mr={2} />
            新日本語
          </DrawerHeader>
          <DrawerBody>
            <SideBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex direction="column" ml={{ base: 0, md: 80 }} minH={`calc(100VH - ${HEADER_HEIGHT * 4}px)`}>
        {children}
        <Divider />
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
