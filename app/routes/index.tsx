import { Heading, Icon, Wrap } from '@chakra-ui/react';
import { MdOutlineFormatListNumbered, MdOutlineMic, MdOutlinePark, MdOutlineTranslate } from 'react-icons/md';
import { $path } from 'remix-routes';
import Main from '~/components/Main';
import NavCard from '~/features/home/components/NavCard';

export const Index = () => (
  <Main>
    <Heading mt={8}>新日本語の世界えよーこそ！</Heading>
    <Wrap mt={4}>
      <NavCard
        to={$path('/kanjis')}
        avatar={<Icon fontSize={24} as={MdOutlineTranslate} />}
        title="新日本語漢字一覧"
        description="新日本語漢字を閲覧できます。"
      />
      <NavCard
        to={$path('/radicals')}
        avatar={<Icon fontSize={24} as={MdOutlinePark} />}
        title="部首索引"
        description="部首から漢字を検索できます。"
      />
      <NavCard
        to={$path('/stroke_counts')}
        avatar={<Icon fontSize={24} as={MdOutlineFormatListNumbered} />}
        title="画数索引"
        description="画数から漢字を検索できます。"
      />
      <NavCard
        to={$path('/reads')}
        avatar={<Icon fontSize={24} as={MdOutlineMic} />}
        title="音訓索引"
        description="よみかたから漢字を検索できます。"
      />
    </Wrap>
  </Main>
);

export default Index;
