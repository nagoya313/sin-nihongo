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
import { $path } from 'remix-routes';
import { useFormContext, ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import { kanjiGlyphCreateParams } from '~/features/kanjis/validators/params';
import { useOptionalUser } from '~/hooks/useUser';
import { getGlyphCanvasProps } from '~/kage/kageData';
import { KANJI_SEARCH_FORM_ID } from '../constants';
import { type getKanjis } from '../models/kanji.server';
import KanjiLink from './KanjiLink';

type EditableGlyphPopoverProps = {
  kanji: Awaited<ReturnType<typeof getKanjis>>[number];
  offset: number;
};

const EditableGlyphPopover = ({ kanji, offset }: EditableGlyphPopoverProps) => {
  const user = useOptionalUser();
  const [preview, setPreview] = useState<typeof kanji['glyph']>(kanji.glyph);
  const closeHandle = () => setPreview(null);
  const { getValues } = useFormContext(KANJI_SEARCH_FORM_ID);
  const formData = getValues();
  formData.set('offset', offset.toString());

  return (
    <Popover isLazy placement="right" onClose={closeHandle}>
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
            method={kanji.glyph != null ? 'patch' : 'post'}
            // こゝの指定方法は怪しい
            action={$path('/kanjis?index&data=routes' as any, formData as any)}
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default EditableGlyphPopover;
