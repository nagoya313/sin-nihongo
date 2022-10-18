import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlinePark } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import { ORDERS } from '~/components/constants';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import ReadSearchInput from '~/features/radicals/components/ReadSearchInput';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import {
  getRadicalsOrderByCodePoint,
  getRadicalsOrderByRead,
  getRadicalsOrderByStrokeCount,
} from '~/features/radicals/models/radical.server';
import { MAX_STOREKE_COUNT, MIN_STOREKE_COUNT, radicalQueryParams } from '~/features/radicals/validators/params';
import { useSearch } from '~/hooks/useSearch';
import { checkedQuery } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜部首索引' });

export const loader = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, radicalQueryParams);
  console.log(query);
  return json(
    query.orderBy === 'code_point'
      ? { radicals: await getRadicalsOrderByCodePoint(query) }
      : query.orderBy === 'read'
      ? { radicalsOrderByRead: await getRadicalsOrderByRead(query) }
      : { radicalsOrderByStrokeCount: await getRadicalsOrderByStrokeCount(query) },
  );
};

const Index = () => {
  const { data, formProps } = useSearch({
    formId: RADICAL_SEARCH_FORM_ID,
    validator: radicalQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlinePark} />} title="部首索引">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <ReadSearchInput />
            <StrokeCountSearchInput min={MIN_STOREKE_COUNT} max={MAX_STOREKE_COUNT} />
          </HStack>
        </SearchPanel>
        <OrderTabs orders={ORDERS}>
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
