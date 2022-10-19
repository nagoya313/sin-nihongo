import { Heading, Stack } from '@chakra-ui/react';
import { $path } from 'remix-routes';
import { useOptionalUser } from '~/hooks/useUser';
import { GlyphIcon, InfoIcon, KanjiIcon, RadicalIcon, ReadIcon, StrokeCountIcon } from '../icons';
import SideBarLink from './SidebarLink';

const SideBar = () => {
  const user = useOptionalUser();

  return (
    <Stack as="nav" spacing={0}>
      <Heading as="h5" size="sm" p={1}>
        メニュー
      </Heading>
      <SideBarLink to={$path('/kanjis')} title="新日本語漢字一覧" icon={KanjiIcon} />
      <SideBarLink to={$path('/radicals')} title="部首索引" icon={RadicalIcon} />
      <SideBarLink to={$path('/stroke_counts')} title="画数索引" icon={StrokeCountIcon} />
      <SideBarLink to={$path('/reads')} title="音訓索引" icon={ReadIcon} />
      {user != null && <SideBarLink to={$path('/glyphs')} title="グリフ一覧" icon={GlyphIcon} />}
      <SideBarLink to={$path('/info')} title="このサイトについて" icon={InfoIcon} />
    </Stack>
  );
};

export default SideBar;
