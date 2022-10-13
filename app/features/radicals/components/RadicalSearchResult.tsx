import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import OrderButton from '~/components/OrderButton';
import { RADICAL_SEARCH_FORM_ID } from '../constants';

type RadicalSearchProps = {
  strokeCountOrder: React.ReactNode;
  readOrder: React.ReactNode;
};

const RadicalSearcResult = ({ strokeCountOrder, readOrder }: RadicalSearchProps) => (
  <Tabs mt={4} colorScheme="purple">
    <TabList>
      <Tab>画数順</Tab>
      <Tab>よみかた順</Tab>
      <OrderButton name="direction" formId={RADICAL_SEARCH_FORM_ID} />
    </TabList>
    <TabPanels>
      <TabPanel>{strokeCountOrder}</TabPanel>
      <TabPanel>{readOrder}</TabPanel>
    </TabPanels>
  </Tabs>
);

export default RadicalSearcResult;
