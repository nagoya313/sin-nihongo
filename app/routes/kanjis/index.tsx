import { HStack, Icon, TabPanel, VStack } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineTranslate } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { ORDERS, REGULAR_RADIO } from '~/components/constants';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import RadioGroup from '~/components/RadioGroup';
import ReadOrder from '~/components/ReadOrder';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import TextInput from '~/components/TextInput';
import { KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import { kanjiQueryParams, MAX_STOREKE_COUNT, MIN_STOREKE_COUNT } from '~/features/kanjis/validators/params';
import { radicalReadOrder, radicalStrokeCountOrder } from '~/features/radicals/models/radical.server';
import useSearch from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({
  title: '新日本語｜新日本語漢字一覧',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await kanjiQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return validationError(result.error);
  }
  if (result.data.orderBy === 'read') return json({ radicalReadOrder: await radicalReadOrder(result.data) });
  return json({ radicalStrokeCountOrder: await radicalStrokeCountOrder(result.data) });
};

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(KANJI_SEARCH_FORM_ID, kanjiQueryParams, initialData);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineTranslate} />} title="新日本語漢字一覧">
      <ValidatedForm {...searchProps}>
        <SearchPanel>
          <VStack w="full" align="start">
            <HStack align="start">
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
              <SearchFormControl as="fieldset" name="regular" label="常用漢字">
                <RadioGroup name="regular" radioLabels={REGULAR_RADIO} />
              </SearchFormControl>
            </HStack>
          </VStack>
        </SearchPanel>
        <OrderTabs formId={KANJI_SEARCH_FORM_ID} orders={ORDERS}>
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
