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
import { Link } from '@remix-run/react';
import { useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm, useControlField } from 'remix-validated-form';
import AsyncSelectInput from '~/components/AsyncSelectInput';
import FormControl from '~/components/FormControl';
import HiddenInput from '~/components/HiddenInput';
import SubmitButton from '~/components/SubmitButton';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import { glyphsQueryParams } from '~/features/glyphs/validators';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { kanjiGlyphCreateParams } from '~/features/kanjis/validators';
import { useOptionalUser } from '~/hooks/useUser';
import { type loader } from '~/routes/glyphs/index';
import { type QueryResultData } from '~/utils/types';
import { type LoaderData } from '~/utils/types';
import { type getDrawableKanjis } from '../../repositories.server';
import GlyphUnlinkForm from '../GlyphUnlinkForm';
import KanjiLink from '../KanjiLink';
import { useEditableGlyphPopover } from './hooks';

type EditableGlyphPopoverProps = {
  kanji: QueryResultData<typeof getDrawableKanjis>[number];
};

const EditableGlyphPopover = ({ kanji }: EditableGlyphPopoverProps) => {
  const user = useOptionalUser();
  const { onOpen, onClose, isOpen, preview, setPreview, formId } = useEditableGlyphPopover(kanji);
  const [data, setData] = useControlField<string>('data', formId);
  const [isReadonlyData, setIsReadonlyData] = useState(false);

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
          {kanji.glyph != null ? (
            <Link to={$path('/glyphs/:name', { name: kanji.glyph.name })}>
              <GlyphCanvas {...getGlyphCanvasProps(kanji.glyph)} />
            </Link>
          ) : (
            <GlyphCanvas {...getGlyphCanvasProps(kanji.glyph)} />
          )}
        </Box>
      </PopoverAnchor>
      <PopoverContent>
        <PopoverBody>
          <HStack align="start">
            <VStack align="start">
              <GlyphCanvas {...getGlyphCanvasProps(preview)} />
              <ValidatedForm
                id={formId}
                method={kanji.glyph != null ? 'patch' : 'post'}
                validator={kanjiGlyphCreateParams}
                defaultValues={{
                  data: data ?? kanji.glyph?.data,
                  code_point: kanji.code_point,
                  form_id: formId,
                }}
              >
                <VStack align="start">
                  <AsyncSelectInput
                    name="glyph_name"
                    label="グリフ名"
                    validator={glyphsQueryParams}
                    isReadOnly={!!kanji.glyph?.name}
                    isCreatable
                    isRequired
                    defaultOption={kanji.glyph != null ? { name: kanji.glyph?.name, data: null } : undefined}
                    action={$path('/glyphs', { index: '' })}
                    toQueryParams={(name) => ({ q: name })}
                    toOptions={(data: LoaderData<typeof loader>) =>
                      'glyphs' in data ? data.glyphs.map(({ name, data }) => ({ name, data })) : []
                    }
                    getOptionLabel={({ name }) => name}
                    getOptionValue={({ name }) => name}
                    formatOptionLabel={({ name }) => name}
                    getNewOptionData={(name) => ({ name, data: null })}
                    onChange={(option) => {
                      setData(option?.data || '');
                      setIsReadonlyData(true);
                    }}
                    onCreateOption={() => setIsReadonlyData(false)}
                  />

                  <FormControl name="data" label="影算料" isRequired>
                    <KageTextArea name="data" onDataChange={setPreview} isReadOnly={isReadonlyData} />
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
