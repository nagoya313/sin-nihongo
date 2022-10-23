import { Heading, Icon, Wrap } from '@chakra-ui/react';
import { $path } from 'remix-routes';
import Main from '~/components/Main';
import { KanjiIcon, RadicalIcon, ReadIcon, StrokeCountIcon } from '~/components/icons';
import NavCard from '~/features/home/components/NavCard';

export const Index = () => (
  <Main>
    <Heading mt={8}>新日本語の世界えよーこそ！</Heading>
    <Wrap mt={4}>
      <NavCard
        to={$path('/kanjis')}
        avatar={<Icon fontSize={24} as={KanjiIcon} />}
        title="新日本語漢字一覧"
        description="新日本語漢字お閲覧できます。"
      />
      <NavCard
        to={$path('/radicals')}
        avatar={<Icon fontSize={24} as={RadicalIcon} />}
        title="部首索引"
        description="部首から漢字お検索できます。"
      />
      <NavCard
        to={$path('/stroke_counts')}
        avatar={<Icon fontSize={24} as={StrokeCountIcon} />}
        title="画数索引"
        description="画数から漢字お検索できます。"
      />
      <NavCard
        to={$path('/reads')}
        avatar={<Icon fontSize={24} as={ReadIcon} />}
        title="音訓索引"
        description="よみかたから漢字お検索できます。"
      />
    </Wrap>
  </Main>
);

export default Index;
