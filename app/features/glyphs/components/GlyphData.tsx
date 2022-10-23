import { Box, HStack, IconButton, VStack } from '@chakra-ui/react';
import { useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MdOutlineEdit, MdOutlineInfo } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import DataItem from '~/components/DataItem';
import DataList from '~/components/Datalist';
import FormControl from '~/components/FormControl';
import FormResetButton from '~/components/FormResetButton';
import SubmitButton from '~/components/SubmitButton';
import TextLink from '~/components/TextLink';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import { toDisplayKageData } from '~/features/kage/decorators';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { type DrawableGlyph } from '~/features/kage/models/kageData';
import { type action, type loader } from '~/routes/glyphs/$name';
import { type LoaderData } from '~/utils/types';
import { glyphUpdateParams } from '../validators';
import KageTextArea from './KageTextArea';

type GlyphResultProps = {
  glyph: LoaderData<typeof loader>['glyph'];
};

const GlyphData = ({ glyph }: GlyphResultProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [preview, setPreview] = useState<DrawableGlyph>(glyph);
  const [defaultData, setDefaultData] = useState(glyph.data ?? '');
  const updated = useActionData<typeof action>();
  const toggle = () => {
    setIsEditMode((prev) => {
      if (prev) {
        setPreview(glyph);
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (updated != null && 'glyph' in updated) {
      setPreview(updated.glyph);
      setDefaultData(updated.glyph.data);
      setIsEditMode(false);
    }
  }, [updated]);

  return (
    <HStack w="full">
      <GlyphCanvas {...getGlyphCanvasProps(preview)} />
      <VStack align="start">
        <DataList>
          <DataItem term="なまえ" definition={glyph.name} isCopyable />
          <DataItem
            term="影算料"
            definition={
              isEditMode ? (
                <ValidatedForm
                  key={defaultData}
                  method="patch"
                  validator={glyphUpdateParams}
                  defaultValues={{ data: defaultData }}
                >
                  <VStack align="start">
                    <FormControl name="data">
                      <KageTextArea name="data" onDataChange={setPreview} />
                    </FormControl>
                    <HStack>
                      <SubmitButton>更新する</SubmitButton>
                      <FormResetButton />
                    </HStack>
                  </VStack>
                </ValidatedForm>
              ) : (
                toDisplayKageData(glyph.data)
              )
            }
            isCopyable
            copyText={glyph.data}
          />
          <DataItem
            term="採用漢字"
            definition={glyph.kanjis.map(({ code_point, kanji }) => (
              <TextLink key={code_point} to={$path('/kanjis/:code_point', { code_point })} text={kanji} />
            ))}
          />
        </DataList>
        <Box px={4}>
          <IconButton
            aria-label="edit-glyph"
            icon={isEditMode ? <MdOutlineInfo /> : <MdOutlineEdit />}
            onClick={toggle}
          />
        </Box>
      </VStack>
    </HStack>
  );
};

export default GlyphData;
