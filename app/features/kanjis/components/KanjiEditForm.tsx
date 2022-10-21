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
import ReadsInput from '~/components/ReadsInput';
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
          <VStack w="full">
            <ValidatedForm validator={kanjiUpdateParams} defaultValues={{ reads: kanji.reads }}>
              <ReadsInput />
            </ValidatedForm>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default KanjiEditForm;
