import { HStack, VStack } from '@chakra-ui/react';
import { ValidatedForm } from 'remix-validated-form';
import NumberInput from '~/components/NumberInput';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import useRadicalSearchPanel from '../hooks/useRadicalSearchPanel';
import { MAX_STOREKE_COUNT, MIN_STOREKE_COUNT } from '../validators/params';

const RadicalSearchPanel = () => (
  <ValidatedForm {...useRadicalSearchPanel()}>
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

export default RadicalSearchPanel;
