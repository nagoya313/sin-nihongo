import { Heading, Stack } from '@chakra-ui/react';

const iconProps = { mr: 4, fontSize: 16 } as const;

type SideBarProps = {
  onClose: () => void;
};

const SideBar = ({ onClose }: SideBarProps) => (
  <Stack as="nav" spacing={0}>
    <Heading as="h5" size="sm" p={1}>
      メニュー
    </Heading>
  </Stack>
);

export default SideBar;
