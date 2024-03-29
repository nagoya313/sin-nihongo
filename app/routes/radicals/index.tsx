import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import SearchStrokeCountInput from '~/components/SearchStrokeCountInput';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import { ORDERS } from '~/components/constants';
import { RadicalIcon } from '~/components/icons';
import SearchRadicalReadInput from '~/features/radicals/components/SearchRadicalReadInput';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import { index } from '~/features/radicals/services.server';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT, radicalQueryParams } from '~/features/radicals/validators';
import { useSearch } from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({ title: '新日本語｜部首索引' });
export const loader = (args: LoaderArgs) => index(args);

const Index = () => {
  const { data, formProps } = useSearch({
    formId: RADICAL_SEARCH_FORM_ID,
    validator: radicalQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });

  return (
    <Page avatar={<Icon fontSize={24} as={RadicalIcon} />} title="部首索引">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <SearchRadicalReadInput />
            <SearchStrokeCountInput min={MIN_STROKE_COUNT} max={MAX_STROKE_COUNT} />
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
