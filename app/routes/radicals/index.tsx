import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlinePark } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { ORDERS } from '~/components/constants';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import TextInput from '~/components/TextInput';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import { radicalReadOrder, radicalStrokeCountOrder } from '~/features/radicals/models/radical.server';
import { MAX_STOREKE_COUNT, MIN_STOREKE_COUNT, radicalQueryParams } from '~/features/radicals/validators/params';
import useSearch from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({
  title: '新日本語｜部首索引',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await radicalQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return validationError(result.error);
  }
  if (result.data.orderBy === 'read') return json({ radicalReadOrder: await radicalReadOrder(result.data) });
  return json({ radicalStrokeCountOrder: await radicalStrokeCountOrder(result.data) });
};

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(RADICAL_SEARCH_FORM_ID, radicalQueryParams, initialData);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlinePark} />} title="部首索引">
      <ValidatedForm {...searchProps}>
        <SearchPanel>
          <HStack align="center">
            <SearchFormControl
              name="read"
              label="よみかた"
              help="部首名は新日本語表音式によるひらがなでの前方一致で絞り込みができます。"
            >
              <TextInput name="read" placeholder="いち、しょー、つずみ" />
            </SearchFormControl>
            <SearchFormControl name="strokeCount" label="画数">
              <NumberInput
                name="strokeCount"
                placeholder={`${MIN_STOREKE_COUNT}〜${MAX_STOREKE_COUNT}`}
                min={MIN_STOREKE_COUNT}
                max={MAX_STOREKE_COUNT}
              />
            </SearchFormControl>
          </HStack>
        </SearchPanel>
        <OrderTabs formId={RADICAL_SEARCH_FORM_ID} orders={ORDERS}>
          <TabPanel>
            {'radicalStrokeCountOrder' in data && (
              <StrokeCountOrder data={data.radicalStrokeCountOrder} to="/radicals" />
            )}
          </TabPanel>
          <TabPanel>{'radicalReadOrder' in data && <ReadOrder data={data.radicalReadOrder} to="/radicals" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
