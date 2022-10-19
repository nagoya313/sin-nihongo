import { Box, HStack, Icon, VStack } from '@chakra-ui/react';
import { json, redirect, type ActionArgs, type MetaFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MdOutlineBook, MdOutlineFontDownload } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm, validationError } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import PageInfo from '~/components/PageInfo';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import KageTextArea from '~/features/glyphs/components/KageTextArea';
import { GLYPHWIKI_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { createGlyph, getGlyphPreview } from '~/features/glyphs/models/glyph.server';
import { glyphCreateParams } from '~/features/glyphs/validators/params';
import GlyphSearchResult from '~/features/glyphwiki/components/GlyphSearchResult';
import { getGlyphwikiForm } from '~/features/glyphwiki/models/glyphwiki.server';
import { glyphwikiQueryParams } from '~/features/glyphwiki/validators/params';
import GlyphCanvasSuspense from '~/features/kage/components/GlyphCanvasSuspense';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import { useSearch } from '~/hooks/useSearch';
import { setFlashMessage } from '~/utils/flash.server';
import { authGuard, checkedFormData } from '~/utils/request.server';
import { type LoaderData } from '~/utils/types';
import { type loader as glyphwikiLoader } from '../glyphwiki';
import { type loader as glyphPreviewLoader } from './preview';

export const meta: MetaFunction = () => ({ title: '新日本語｜グリフ作成' });

const INITIAL_DATA = {} as LoaderData<typeof glyphwikiLoader>;

export const action = async ({ request }: ActionArgs) => {
  await authGuard(request);
  const data = await checkedFormData(request, glyphCreateParams);
  if (data.subaction == null) {
    const { isDrawable } = await getGlyphPreview(data.data);
    if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' } }, data);
  }
  try {
    await createGlyph(data);
  } catch {
    return validationError({ fieldErrors: { name: '登録済みです' }, subaction: data.subaction }, data);
  }
  const headers = await setFlashMessage(request, { message: 'グリフを登録しました', status: 'success' });
  if (data.subaction !== 'from-glyphwiki') return redirect($path('/glyphs'), headers);
  return json(await getGlyphwikiForm(data.q), headers);
};

const New = () => {
  const { data, formProps } = useSearch({
    formId: GLYPHWIKI_SEARCH_FORM_ID,
    validator: glyphwikiQueryParams,
    initialData: INITIAL_DATA,
    action: $path('/glyphwiki'),
  });
  const actionResult = useActionData<typeof action>();
  const [glyph, setGlyph] = useState<typeof data>(data);
  const [preview, setPreview] = useState<LoaderData<typeof glyphPreviewLoader>>();

  useEffect(() => {
    setGlyph(data);
  }, [data]);

  useEffect(() => {
    if (actionResult != null && 'glyphs' in actionResult) {
      setGlyph(actionResult);
    }
  }, [actionResult]);

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
