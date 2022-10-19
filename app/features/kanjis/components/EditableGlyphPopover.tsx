import {
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import GlyphCanvasSuspense from '~/features/kage/components/GlyphCanvasSuspense';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { kanjiGlyphCreateParams } from '~/features/kanjis/validators';
import { useOptionalUser } from '~/hooks/useUser';
import { type action } from '~/routes/kanjis/index';
import { QueryResultData } from '~/utils/types';
import { type getKanjis } from '../repositories.server';
import GlyphUnlinkForm from './GlyphUnlinkForm';
import KanjiLink from './KanjiLink';

type EditableGlyphPopoverProps = {
  kanji: QueryResultData<typeof getKanjis>[number];
};

const EditableGlyphPopover = ({ kanji }: EditableGlyphPopoverProps) => {
  const user = useOptionalUser();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [preview, setPreview] = useState<typeof kanji['glyph']>();
  const openHandle = () => {
    setPreview(kanji.glyph);
    onOpen();
  };
  const updated = useActionData<typeof action>();

  useEffect(() => {
    if (updated != null && 'kanji' in updated) {
      onClose();
    }
  }, [updated, onClose]);

  return (
    <Popover isOpen={isOpen} onOpen={openHandle} onClose={onClose} isLazy placement="right">
      <VStack p={2}>
        <KanjiLink codePoint={kanji.code_point} />
        {user != null && (
          <PopoverTrigger>
            <IconButton aria-label="edit-kanji-glyph" icon={<MdOutlineEdit />} />
          </PopoverTrigger>
        )}
      </VStack>
      <PopoverAnchor>
        <Box>
          <GlyphCanvasSuspense {...getGlyphCanvasProps(kanji.glyph)} />
        </Box>
      </PopoverAnchor>
      <PopoverContent>
        <PopoverBody>
          <HStack align="start">
            <VStack align="start">
              <GlyphCanvasSuspense {...getGlyphCanvasProps(preview)} />
              <ValidatedForm
                id={`KANJI_GLYPH_EDIT_FORM_${kanji.code_point}`}
                method={kanji.glyph != null ? 'patch' : 'post'}
                validator={kanjiGlyphCreateParams}
                defaultValues={{
                  name: kanji.glyph?.name,
                  data: kanji.glyph?.data,
                  codePoint: kanji.code_point,
                  formId: `KANJI_GLYPH_EDIT_FORM_${kanji.code_point}`,
                }}
              >
                <VStack align="start">
                  <FormControl name="name" label="なまえ" isRequired>
                    <TextInput name="name" isReadOnly={!!kanji.glyph?.name} />
                  </FormControl>
                  <FormControl name="data" label="影算料" isRequired>
                    <KageTextArea name="data" onDataChange={setPreview} />
                  </FormControl>
                  <HiddenInput name="codePoint" />
                  <HiddenInput name="formId" />
                  <SubmitButton>{kanji.glyph != null ? '更新する' : '作成する'}</SubmitButton>
                </VStack>
              </ValidatedForm>
            </VStack>
            <GlyphUnlinkForm kanji={kanji} />
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditableGlyphPopover;
