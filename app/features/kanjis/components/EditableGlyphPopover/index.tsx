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
import { MdOutlineEdit } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import AsyncSelectInput from '~/components/AsyncSelectInput';
import FormControl from '~/components/FormControl';
import SubmitButton from '~/components/SubmitButton';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import { glyphsQueryParams } from '~/features/glyphs/validators';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { kanjiGlyphCreateParams, kanjiGlyphUpdateParams } from '~/features/kanjis/validators';
import { useOptionalUser } from '~/hooks/useUser';
import { type loader } from '~/routes/kanjis/glyphs';
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
  const { onOpen, onClose, isOpen, preview, setPreview, data, selectGlyph, formId, mode, toCreateMode } =
    useEditableGlyphPopover(kanji);

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
                method={kanji.glyph != null || mode === 'link' ? 'patch' : 'post'}
                validator={kanji.glyph != null ? kanjiGlyphCreateParams : kanjiGlyphUpdateParams}
                defaultValues={{ data: data ?? kanji.glyph?.data }}
              >
                <VStack align="start">
                  <AsyncSelectInput
                    name="glyph_name"
                    label="グリフ名"
                    validator={glyphsQueryParams}
                    isReadOnly={!!kanji.glyph?.name}
                    isCreatable
                    isRequired
                    defaultOption={
                      kanji.glyph != null ? { name: kanji.glyph?.name, data: '', q: '', isNew: false } : undefined
                    }
                    action={$path('/kanjis/glyphs')}
                    toQueryParams={(name) => ({ q: name })}
                    toOptions={(data: LoaderData<typeof loader>) =>
                      'glyphs' in data
                        ? data.glyphs.map(({ name, data, q }) => ({ name, data, q: q, isNew: false }))
                        : []
                    }
                    getOptionLabel={({ q }) => q}
                    getOptionValue={({ name }) => name}
                    formatOptionLabel={({ name, isNew }) => (isNew ? `${name}で作成` : name)}
                    getNewOptionData={(name) => ({ name, data: '', q: name, isNew: true })}
                    onChange={selectGlyph}
                    onCreateOption={toCreateMode}
                  />

                  <FormControl name="data" label="影算料" isRequired>
                    <KageTextArea name="data" onDataChange={setPreview} isReadOnly={mode === 'link'} />
                  </FormControl>
                  <input type="hidden" name="code_point" value={kanji.code_point} />
                  <input type="hidden" name="form_id" value={formId} />
                  {kanji.glyph == null && <input type="hidden" name="type" value={mode} />}
                  <SubmitButton>
                    {kanji.glyph != null ? '更新する' : mode === 'link' ? '関連ずける' : '作成する'}
                  </SubmitButton>
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
