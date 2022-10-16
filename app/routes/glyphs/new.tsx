import { Box, HStack, Icon, VStack } from '@chakra-ui/react';
import { json, redirect, type ActionArgs, type MetaFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MdOutlineBook, MdOutlineFontDownload } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import PageInfo from '~/components/PageInfo';
import SubmitButton from '~/components/SubmitButton';
import TextArea from '~/components/TextArea';
import TextInput from '~/components/TextInput';
import { GLYPHWIKI_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { createGlyph } from '~/features/glyphs/models/glyph.server';
import { glyphCreateParams } from '~/features/glyphs/validators/params';
import GlyphSearchResult from '~/features/glyphwiki/components/GlyphSearchResult';
import { getGlyphwiki } from '~/features/glyphwiki/models/glyphwiki.server';
import { glyphwikiQueryParams } from '~/features/glyphwiki/validators/params';
import type useMatchesData from '~/hooks/useMatchesData';
import { useSearch } from '~/hooks/useSearch';
import { commitSessionHeaders, setFlashMessage } from '~/session.server';
import { authGuard, checkedFormData } from '~/utils/request.server';
import { type loader } from '../glyphwiki';

export const meta: MetaFunction = () => ({ title: '新日本語｜グリフ作成' });

const INITIAL_DATA = {} as ReturnType<typeof useMatchesData<typeof loader>>;

export const action = async ({ request }: ActionArgs) => {
  await authGuard(request);
  const data = await checkedFormData(request, glyphCreateParams);
  await createGlyph(data);
  const session = await setFlashMessage(request, { message: 'グリフを登録しました', status: 'success' });
  const headers = await commitSessionHeaders(session);
  if (data.subaction !== 'from-glyphwiki') return redirect($path('/glyphs'), headers);
  return json({ glyph: await getGlyphwiki(data.name) }, headers);
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

  useEffect(() => {
    setGlyph(data);
  }, [data]);

  useEffect(() => {
    if (actionResult != null) {
      setGlyph(actionResult);
    }
  }, [actionResult]);

  return (
    <HStack flex={1} p={8} align="start">
      <VStack align="start">
        <PageInfo avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />} title="グリフ作成" />
        <GlyphCanvasSuspense />
        <ValidatedForm method="post" validator={glyphCreateParams}>
          <VStack align="start">
            <FormControl name="name" label="なまえ" isRequired>
              <TextInput name="name" />
            </FormControl>
            <FormControl name="data" label="影算料" isRequired>
              <TextArea name="data" />
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
          {'glyph' in glyph! && <GlyphSearchResult glyph={glyph.glyph} />}
        </Box>
      </VStack>
    </HStack>
  );
};

export default New;
