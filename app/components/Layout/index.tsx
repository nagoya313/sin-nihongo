import { Box, Divider, Flex, VStack } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { HEADER_HEIGHT } from '~/styles/constants';
import AppBar from './AppBar';
import Footer from './Footer';
import MenuDrawer from './MenuDawer';
import SideBar from './Sidebar';
import WithFlashToaster from './WithFlashToaster';

const Layout = () => (
  <WithFlashToaster>
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
    <MenuDrawer />
    <Flex direction="column" ml={{ base: 0, md: 80 }} minH={`calc(100VH - ${HEADER_HEIGHT * 4}px)`}>
      <Outlet />
      <Divider />
      <Footer />
    </Flex>
  </WithFlashToaster>
);

export default Layout;
