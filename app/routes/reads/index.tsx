import { HStack, Icon, TabPanel, VStack } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineMic } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { REGULAR_RADIO } from '~/components/constants';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import RadioGroup from '~/components/RadioGroup';
import ReadOrder from '~/components/ReadOrder';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import { READ_SEARCH_FROM_ID } from '~/features/kanjis/constants';
import { kanjiReadOrder } from '~/features/kanjis/models/kanji.server';
import { kanjiQueryParams, MAX_STOREKE_COUNT, MIN_STOREKE_COUNT } from '~/features/kanjis/validators/params';
import useSearch from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({
  title: '新日本語｜音訓索引',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await kanjiQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return validationError(result.error);
  }
  return json({ kanjiReadOrder: await kanjiReadOrder(result.data) });
};

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(READ_SEARCH_FROM_ID, kanjiQueryParams, initialData);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineMic} />} title="音訓索引">
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
        <OrderTabs formId={READ_SEARCH_FROM_ID} orders={[{ key: 'read', label: 'よみかた順' }]}>
          <TabPanel>{'kanjiReadOrder' in data && <ReadOrder data={data.kanjiReadOrder} to="/kanjis" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
