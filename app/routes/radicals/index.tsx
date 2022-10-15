import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlinePark } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import { ORDERS } from '~/components/constants';
import FormControl from '~/components/FormControl';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import TextInput from '~/components/TextInput';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import { getRadicalsOrderByRead, getRadicalsOrderByStrokeCount } from '~/features/radicals/models/radical.server';
import { MAX_STOREKE_COUNT, MIN_STOREKE_COUNT, radicalQueryParams } from '~/features/radicals/validators/params';
import useSearch from '~/hooks/useSearch';
import { checkedQueryRequestLoader } from '~/utils/request';

export const meta: MetaFunction = () => ({
  title: '新日本語｜部首索引',
});

export const loader = async ({ request }: LoaderArgs) =>
  checkedQueryRequestLoader(request, radicalQueryParams, async (query) =>
    query.orderBy === 'read'
      ? { radicalsOrderByRead: await getRadicalsOrderByRead(query) }
      : { radicalsOrderByStrokeCount: await getRadicalsOrderByStrokeCount(query) },
  );

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(RADICAL_SEARCH_FORM_ID, radicalQueryParams, initialData);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlinePark} />} title="部首索引">
      <ValidatedForm {...searchProps}>
        <SearchPanel>
          <HStack align="center">
            <FormControl
              name="read"
              label="よみかた"
              help="部首名は新日本語表音式によるひらがなでの前方一致で絞り込みができます。"
            >
              <TextInput name="read" placeholder="いち、しょー、つずみ" />
            </FormControl>
            <FormControl name="strokeCount" label="画数">
              <NumberInput
                name="strokeCount"
                placeholder={`${MIN_STOREKE_COUNT}〜${MAX_STOREKE_COUNT}`}
                min={MIN_STOREKE_COUNT}
                max={MAX_STOREKE_COUNT}
              />
            </FormControl>
          </HStack>
        </SearchPanel>
        <OrderTabs formId={RADICAL_SEARCH_FORM_ID} orders={ORDERS}>
          <TabPanel>
            {'radicalsOrderByStrokeCount' in data && (
              <StrokeCountOrder data={data.radicalsOrderByStrokeCount} to="/radicals" />
            )}
          </TabPanel>
          <TabPanel>
            {'radicalsOrderByRead' in data && <ReadOrder data={data.radicalsOrderByRead} to="/radicals" />}
          </TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
