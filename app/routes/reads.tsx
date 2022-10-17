import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineMic } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import ReadSearchInput from '~/features/kanjis/components/ReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import { READ_SEARCH_FROM_ID } from '~/features/kanjis/constants';
import { getKanjisOrderByRead } from '~/features/kanjis/models/kanji.server';
import { kanjiQueryParams, MAX_STOREKE_COUNT, MIN_STOREKE_COUNT } from '~/features/kanjis/validators/params';
import { useSearch } from '~/hooks/useSearch';
import { checkedQuery } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜音訓索引' });

export const loader = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getKanjisOrderByRead(query) });
};

const Index = () => {
  const { data, formProps } = useSearch({
    formId: READ_SEARCH_FROM_ID,
    validator: kanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineMic} />} title="音訓索引">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <ReadSearchInput />
            <StrokeCountSearchInput min={MIN_STOREKE_COUNT} max={MAX_STOREKE_COUNT} />
            <RegularSelectRadio />
          </HStack>
        </SearchPanel>
        <OrderTabs orders={[{ key: 'read', label: 'よみかた順' }]}>
          <TabPanel>{'kanjis' in data && <ReadOrder data={data.kanjis} to="/kanjis" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
