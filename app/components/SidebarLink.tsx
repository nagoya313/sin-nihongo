import { Flex, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from '@remix-run/react';
import { useSetAtom } from 'jotai';
import { closeSidebarAtom } from '~/atoms/sidebarAtom';

type SideBarLinkProps = {
  title: string;
  to: string;
  icon: React.ReactNode;
};

const SideBarLink = ({ to, title, icon }: SideBarLinkProps) => {
  const onClose = useSetAtom(closeSidebarAtom);
  const selectedBg = useColorModeValue('purple.100', 'purple.800');
  const selectedColor = useColorModeValue('purple.800', 'purple.100');

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Flex
          align="center"
          mt={2}
          ml={4}
          mr={4}
          p={2}
          rounded="md"
          role="group"
          bg={isActive ? selectedBg : undefined}
          color={isActive ? selectedColor : undefined}
          onClick={onClose}
        >
          {icon}
          {title}
        </Flex>
      )}
    </NavLink>
  );
};

export default SideBarLink;
