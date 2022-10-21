import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Heading,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import CheckboxInput from '~/components/CheckboxInput';
import FormControl from '~/components/FormControl';
import NumberInput from '~/components/NumberInput';
import RadioInput from '~/components/RadioInput';
import ReadsInput from '~/components/ReadsInput';
import SubmitButton from '~/components/SubmitButton';
import { type loader } from '~/routes/kanjis/$code_point';
import { type LoaderData } from '~/utils/types';
import { kanjiUpdateParams } from '../validators';

type KanjiEditFormProps = {
  kanji: LoaderData<typeof loader>['kanji'];
};

const KanjiEditForm = ({ kanji }: KanjiEditFormProps) => {
  return (
    <Accordion allowToggle w="full">
      <AccordionItem>
        <AccordionButton>
          <HStack w="full">
            <Icon as={MdEdit} />
            <Heading size="sm">編集</Heading>
          </HStack>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel mt={4}>
          <VStack align="start">
            <ValidatedForm
              validator={kanjiUpdateParams}
              defaultValues={{
                stroke_count: kanji.stroke_count,
                in_radical_stroke_count: kanji.in_radical_stroke_count,
                reads: kanji.reads,
                regular: kanji.regular,
                for_name: kanji.for_name,
                jis_level: kanji.jis_level,
                radical: kanji.radical_code_point,
              }}
            >
              <HStack align="start">
                <VStack p={8} align="start">
                  <FormControl name="stroke_count" label="画数" isRequired>
                    <NumberInput name="stroke_count" min={1} max={100} />
                  </FormControl>
                  <FormControl name="in_radical_stroke_count" label="部首内画数" isRequired>
                    <NumberInput name="in_radical_stroke_count" min={-1} max={100} />
                  </FormControl>
                </VStack>
                <VStack p={8} align="start">
                  <ReadsInput />
                </VStack>
                <VStack p={8} align="start">
                  <CheckboxInput name="regular" label="常用漢字" />
                  <CheckboxInput name="for_name" label="人名用漢字" />
                  <RadioInput
                    name="jis_level"
                    label="JIS水準"
                    options={[
                      { value: '1', label: '第一水準' },
                      { value: '2', label: '第二水準' },
                    ]}
                  />
                </VStack>
              </HStack>
              <SubmitButton>更新する</SubmitButton>
            </ValidatedForm>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default KanjiEditForm;
