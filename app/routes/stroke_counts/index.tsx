import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { REGULAR_RADIO } from '~/components/constants';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import RadioGroup from '~/components/RadioGroup';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import TextInput from '~/components/TextInput';
import { STROKE_COUNT_SEARCH_FROM_ID } from '~/features/kanjis/constants';
import { kanjiStrokeCountOrder } from '~/features/kanjis/models/kanji.server';
import { kanjiQueryParams } from '~/features/kanjis/validators/params';
import useSearch from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({
  title: '新日本語｜画数索引',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await kanjiQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return validationError(result.error);
  }
  return json({ kanjiStrokeCountOrder: await kanjiStrokeCountOrder(result.data) });
};

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(STROKE_COUNT_SEARCH_FROM_ID, kanjiQueryParams, initialData);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineFormatListNumbered} />} title="画数索引">
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
            <SearchFormControl as="fieldset" name="regular" label="常用漢字">
              <RadioGroup name="regular" radioLabels={REGULAR_RADIO} />
            </SearchFormControl>
          </HStack>
        </SearchPanel>
        <OrderTabs formId={STROKE_COUNT_SEARCH_FROM_ID} orders={[{ key: 'stroke_count', label: '画数順' }]}>
          <TabPanel>
            {'kanjiStrokeCountOrder' in data && <StrokeCountOrder data={data.kanjiStrokeCountOrder} to="/kanjis" />}
          </TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
