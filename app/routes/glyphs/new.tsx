import { Box, HStack, Icon, VStack } from '@chakra-ui/react';
import { type ActionArgs, type MetaFunction } from '@remix-run/node';
import { MdOutlineBook, MdOutlineFontDownload } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import PageInfo from '~/components/PageInfo';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import useGlyphNew from '~/features/glyphs/hooks/useGlyphNew';
import { create } from '~/features/glyphs/services.server';
import { glyphCreateParams } from '~/features/glyphs/validators';
import GlyphSearchResult from '~/features/glyphwiki/components/GlyphSearchResult';
import GlyphCanvasSuspense from '~/features/kage/components/GlyphCanvasSuspense';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { actionResponse, authGuard } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜グリフ作成' });

export const action = async ({ request }: ActionArgs) => {
  await authGuard(request);
  return actionResponse(request, { POST: () => create(request) });
};

const New = () => {
  const { formProps, preview, setPreview, glyph } = useGlyphNew();

  return (
    <HStack flex={1} p={8} align="start">
      <VStack align="start">
        <PageInfo avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />} title="グリフ作成" />
        <GlyphCanvasSuspense {...getGlyphCanvasProps(preview)} />
        <ValidatedForm method="post" validator={glyphCreateParams}>
          <VStack align="start">
            <FormControl name="name" label="なまえ" isRequired>
              <TextInput name="name" />
            </FormControl>
            <FormControl name="data" label="影算料" isRequired>
              <KageTextArea name="data" onDataChange={setPreview} />
            </FormControl>
            <SubmitButton>作成する</SubmitButton>
          </VStack>
        </ValidatedForm>
      </VStack>
      <VStack align="start">
        <PageInfo avatar={<Icon fontSize={24} as={MdOutlineBook} />} title="グリフウィキから検索" />
        <ValidatedForm {...formProps}>
          <FormControl name="q">
            <TextInput name="q" />
          </FormControl>
        </ValidatedForm>
        <Box overflow="hidden" mt={8}>
          {'glyphs' in glyph! && <GlyphSearchResult glyphs={glyph.glyphs} />}
        </Box>
      </VStack>
    </HStack>
  );
};

export default New;
