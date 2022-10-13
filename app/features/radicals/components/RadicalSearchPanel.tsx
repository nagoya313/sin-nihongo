import { HStack, VStack } from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import { useFormContext, ValidatedForm } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import { SEARCH_WAIT } from '~/components/constants';
import NumberInput from '~/components/NumberInput';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import { RADICAL_SEARCH_FORM_ID } from '../constants';
import { MAX_STOREKE_COUNT, MIN_STOREKE_COUNT, radicalQueryParams } from '../validators/params';

const RadicalSearchPanel = () => {
  const fetcher = useFetcher();
  const { getValues } = useFormContext(RADICAL_SEARCH_FORM_ID);
  const handleChange = useDebouncedCallback(async () => {
    const formData = getValues();
    const result = await radicalQueryParams.validate(formData);
    if (!result.error) {
      fetcher.submit(formData);
    }
  }, SEARCH_WAIT);

  return (
    <ValidatedForm id={RADICAL_SEARCH_FORM_ID} validator={radicalQueryParams} fetcher={fetcher} onChange={handleChange}>
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
    </ValidatedForm>
  );
};

export default RadicalSearchPanel;
