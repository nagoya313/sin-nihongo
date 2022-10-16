import { Box, HStack, Icon, VStack } from '@chakra-ui/react';
import { json, redirect, type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useState } from 'react';
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
import useMatchesData from '~/hooks/useMatchesData';
import useSearch from '~/hooks/useSearch';
import { authGuard, checkedFormDataRequestLoader } from '~/utils/request';
import { type loader as glyphwikiLoader } from '../glyphwiki';

export const meta: MetaFunction = () => ({
  title: '新日本語｜グリフ作成',
});

export const loader = async (args: LoaderArgs) => authGuard(args, async () => json({}));

export const action = async (args: ActionArgs) =>
  authGuard(args, async ({ request }) =>
    checkedFormDataRequestLoader(request, glyphCreateParams, async (data) => {
      await createGlyph(data);
      if (data.subaction !== 'from-glyphwiki') return redirect($path('/glyphs'));
      return json({ glyph: await getGlyphwiki(data.name) });
    }),
  );

const New = () => {
  const { data, formProps } = useSearch(
    GLYPHWIKI_SEARCH_FORM_ID,
    glyphwikiQueryParams,
    {} as ReturnType<typeof useMatchesData<typeof glyphwikiLoader>>,
    $path('/glyphwiki'),
  );
  const actionResult = useActionData<typeof action>();
  const [glyph, setGlyph] = useState<typeof data>({});

  /*useEffect(() => {
    setGlyph(data);
  }, [data]);*/

  /*useEffect(() => {
    setGlyph(glyph);
  }, [actionResult]);*/

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
          {'glyph' in glyph && <GlyphSearchResult glyph={glyph.glyph} />}
        </Box>
      </VStack>
    </HStack>
  );
};

export default New;
