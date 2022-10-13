import { HStack, TabPanel, VStack } from '@chakra-ui/react';
import { ValidatedForm } from 'remix-validated-form';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import ReadOrder from '~/components/ReadOrder';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import TextInput from '~/components/TextInput';
import useSearch from '~/hooks/useSearch';
import { RADICAL_SEARCH_FORM_ID } from '../constants';
import { MAX_STOREKE_COUNT, MIN_STOREKE_COUNT, radicalQueryParams } from '../validators/params';

const ORDERS = Object.freeze([
  { key: 'stroke_count', label: '画数順' },
  { key: 'read', label: 'よみかた順' },
]);

const Radicals = () => {
  const { data, ...searchProps } = useSearch(RADICAL_SEARCH_FORM_ID, radicalQueryParams);
  console.log(data);

  return (
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
              <NumberInput name="strokeCount" placeholder={`${MIN_STOREKE_COUNT}〜${MAX_STOREKE_COUNT}`} />
            </SearchFormControl>
          </HStack>
        </VStack>
      </SearchPanel>
      <OrderTabs formId={RADICAL_SEARCH_FORM_ID} orders={ORDERS}>
        <TabPanel>
          <StrokeCountOrder data={data} />
        </TabPanel>
        <TabPanel>{'read_front' in (data[0] ?? {}) && <ReadOrder data={data} />}</TabPanel>
      </OrderTabs>
    </ValidatedForm>
  );
};

export default Radicals;
