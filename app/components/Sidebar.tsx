import { Heading, Icon, Stack } from '@chakra-ui/react';
import { MdOutlineInfo, MdOutlinePark } from 'react-icons/md';
import { $path } from 'remix-routes';
import SideBarLink from './SidebarLink';

const iconProps = { mr: 4, fontSize: 16 } as const;

const SideBar = () => (
  <Stack as="nav" spacing={0}>
    <Heading as="h5" size="sm" p={1}>
      メニュー
    </Heading>
    <SideBarLink to={$path('/radicals')} title="部首索引" icon={<Icon {...iconProps} as={MdOutlinePark} />} />
    <SideBarLink to={$path('/info')} title="このサイトについて" icon={<Icon {...iconProps} as={MdOutlineInfo} />} />
  </Stack>
);

export default SideBar;
