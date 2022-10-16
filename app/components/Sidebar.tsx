import { Heading, Icon, Stack } from '@chakra-ui/react';
import {
  MdOutlineFontDownload,
  MdOutlineFormatListNumbered,
  MdOutlineInfo,
  MdOutlineMic,
  MdOutlinePark,
  MdOutlineTranslate,
} from 'react-icons/md';
import { $path } from 'remix-routes';
import { useOptionalUser } from '~/hooks/useUser';
import SideBarLink from './SidebarLink';

const iconProps = Object.freeze({ mr: 4, fontSize: 16 });

const SideBar = () => {
  const user = useOptionalUser();

  return (
    <Stack as="nav" spacing={0}>
      <Heading as="h5" size="sm" p={1}>
        メニュー
      </Heading>
      <SideBarLink
        to={$path('/kanjis')}
        title="新日本語漢字一覧"
        icon={<Icon {...iconProps} as={MdOutlineTranslate} />}
      />
      <SideBarLink to={$path('/radicals')} title="部首索引" icon={<Icon {...iconProps} as={MdOutlinePark} />} />
      <SideBarLink
        to={$path('/stroke_counts')}
        title="画数索引"
        icon={<Icon {...iconProps} as={MdOutlineFormatListNumbered} />}
      />
      <SideBarLink to={$path('/reads')} title="音訓索引" icon={<Icon {...iconProps} as={MdOutlineMic} />} />
      {user != null && (
        <SideBarLink
          to={$path('/glyphs')}
          title="グリフ一覧"
          icon={<Icon {...iconProps} as={MdOutlineFontDownload} />}
        />
      )}
      <SideBarLink to={$path('/info')} title="このサイトについて" icon={<Icon {...iconProps} as={MdOutlineInfo} />} />
    </Stack>
  );
};

export default SideBar;
