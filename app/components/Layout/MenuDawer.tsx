import { Avatar, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader } from '@chakra-ui/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { closeSidebarAtom, isOpenSidebarAtom } from '~/atoms/sidebarAtom';
import SideBar from './Sidebar';

const MenuDrawer = () => {
  const isOpen = useAtomValue(isOpenSidebarAtom);
  const onClose = useSetAtom(closeSidebarAtom);

  return (
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
  );
};

export default MenuDrawer;
