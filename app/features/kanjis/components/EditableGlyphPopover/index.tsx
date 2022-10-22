import {
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { kanjiGlyphCreateParams } from '~/features/kanjis/validators';
import { useOptionalUser } from '~/hooks/useUser';
import { type QueryResultData } from '~/utils/types';
import { type getDrawableKanjis } from '../../repositories.server';
import GlyphUnlinkForm from '../GlyphUnlinkForm';
import KanjiLink from '../KanjiLink';
import { useEditableGlyphPopover } from './hooks';

type EditableGlyphPopoverProps = {
  kanji: QueryResultData<typeof getDrawableKanjis>[number];
};

const EditableGlyphPopover = ({ kanji }: EditableGlyphPopoverProps) => {
  const user = useOptionalUser();
  const { onOpen, onClose, isOpen, preview, setPreview } = useEditableGlyphPopover(kanji);

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} isLazy placement="right">
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
          <GlyphCanvas {...getGlyphCanvasProps(kanji.glyph)} />
        </Box>
      </PopoverAnchor>
      <PopoverContent>
        <PopoverBody>
          <HStack align="start">
            <VStack align="start">
              <GlyphCanvas {...getGlyphCanvasProps(preview)} />
              <ValidatedForm
                id={`KANJI_GLYPH_EDIT_FORM_${kanji.code_point}`}
                method={kanji.glyph != null ? 'patch' : 'post'}
                validator={kanjiGlyphCreateParams}
                defaultValues={{
                  glyph_name: kanji.glyph?.name,
                  data: kanji.glyph?.data,
                  code_point: kanji.code_point,
                  form_id: `KANJI_GLYPH_EDIT_FORM_${kanji.code_point}`,
                }}
              >
                <VStack align="start">
                  <FormControl name="glyph_name" label="なまえ" isRequired>
                    <TextInput name="glyph_name" isReadOnly={!!kanji.glyph?.name} />
                  </FormControl>
                  <FormControl name="data" label="影算料" isRequired>
                    <KageTextArea name="data" onDataChange={setPreview} />
                  </FormControl>
                  <HiddenInput name="code_point" />
                  <HiddenInput name="form_id" />
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
