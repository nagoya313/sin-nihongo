import {
  Box,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import { kanjiGlyphCreateParams } from '~/features/kanjis/validators/params';
import { useOptionalUser } from '~/hooks/useUser';
import { getGlyphCanvasProps } from '~/kage/kageData';
import { type loader as glyphPreviewLoader } from '~/routes/glyphs/preview';
import { type LoaderData } from '~/utils/types';
import { type getKanjis } from '../models/kanji.server';
import KanjiLink from './KanjiLink';

type EditableGlyphPopoverProps = {
  kanji: Awaited<ReturnType<typeof getKanjis>>[number];
};

const EditableGlyphPopover = ({ kanji }: EditableGlyphPopoverProps) => {
  const user = useOptionalUser();
  const [preview, setPreview] = useState<LoaderData<typeof glyphPreviewLoader>>();

  return (
    <Popover isLazy>
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
          <GlyphCanvasSuspense {...getGlyphCanvasProps(preview)} />
          <ValidatedForm
            id={`KANJI_GLYPH_EDIT_FORM_${kanji.code_point}`}
            method="post"
            validator={kanjiGlyphCreateParams}
            defaultValues={{ codePoint: kanji.code_point, formId: `KANJI_GLYPH_EDIT_FORM_${kanji.code_point}` }}
          >
            <VStack align="start">
              <FormControl name="name" label="なまえ" isRequired>
                <TextInput name="name" />
              </FormControl>
              <FormControl name="data" label="影算料" isRequired>
                <KageTextArea name="data" onDataChange={setPreview} />
              </FormControl>
              <HiddenInput name="codePoint" />
              <HiddenInput name="formId" />
              <SubmitButton>作成する</SubmitButton>
            </VStack>
          </ValidatedForm>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditableGlyphPopover;
