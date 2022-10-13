import { Heading, Icon, Wrap } from '@chakra-ui/react';
import { MdOutlinePark } from 'react-icons/md';
import { $path } from 'remix-routes';
import Main from '~/components/Main';
import NavCard from '~/features/home/components/NavCard';

export const Index = () => (
  <Main>
    <Heading mt={8}>新日本語の世界えよーこそ！</Heading>
    <Wrap mt={4}>
      <NavCard
        to={$path('/radicals')}
        avatar={<Icon fontSize={24} as={MdOutlinePark} />}
        title="部首索引"
        description="部首から漢字を検索できます。"
      />
    </Wrap>
  </Main>
);

export default Index;
