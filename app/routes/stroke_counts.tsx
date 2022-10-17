import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import ReadSearchInput from '~/features/kanjis/components/ReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import { STROKE_COUNT_SEARCH_FROM_ID } from '~/features/kanjis/constants';
import { getKanjisOrderByStrokeCount } from '~/features/kanjis/models/kanji.server';
import { kanjiQueryParams } from '~/features/kanjis/validators/params';
import { useSearch } from '~/hooks/useSearch';
import { checkedQuery } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜画数索引' });

export const loader = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getKanjisOrderByStrokeCount(query) });
};

const Index = () => {
  const { data, formProps } = useSearch({
    formId: STROKE_COUNT_SEARCH_FROM_ID,
    validator: kanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineFormatListNumbered} />} title="画数索引">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <ReadSearchInput />
            <RegularSelectRadio />
          </HStack>
        </SearchPanel>
        <OrderTabs orders={[{ key: 'stroke_count', label: '画数順' }]}>
          <TabPanel>{'kanjis' in data && <StrokeCountOrder data={data.kanjis} to="/kanjis" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
