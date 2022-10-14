import { Icon } from '@chakra-ui/react';
import { MdOutlineFontDownload } from 'react-icons/md';
import Page from '~/components/Page';

const Index = () => <Page avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />} title="グリフ一覧"></Page>;

export default Index;
