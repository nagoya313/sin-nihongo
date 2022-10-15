import { Box, HStack, Icon, VStack } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { MdOutlineFontDownload } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import Page from '~/components/Page';
import SubmitButton from '~/components/SubmitButton';
import TextArea from '~/components/TextArea';
import TextInput from '~/components/TextInput';
import { GLYPHWIKI_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { glyphCreateParams } from '~/features/glyphs/validators/params';
import GlyphSearchResult from '~/features/glyphwiki/components/GlyphSearchResult';
import { glyphwikiQueryParams } from '~/features/glyphwiki/validators/params';
import useMatchesData from '~/hooks/useMatchesData';
import useSearch from '~/hooks/useSearch';
import { authGuard } from '~/utils/request';
import { type loader as glyphwikiLoader } from '../glyphwiki';

export const meta: MetaFunction = () => ({
  title: '新日本語｜グリフ作成',
});

export const loader = async (args: LoaderArgs) => authGuard(args, async () => json({}));

const New = () => {
  const { data, ...searchProps } = useSearch(
    GLYPHWIKI_SEARCH_FORM_ID,
    glyphwikiQueryParams,
    {} as ReturnType<typeof useMatchesData<typeof glyphwikiLoader>>,
    $path('/glyphwiki'),
  );

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />} title="グリフ作成">
      <HStack p={8} gap={8} align="top">
        <VStack align="start">
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
        <Box overflow="hidden">
          <ValidatedForm {...searchProps}>
            <FormControl name="name" label="グリフウィキから検索" isRequired>
              <TextInput name="q" />
            </FormControl>
          </ValidatedForm>
          {'glyph' in data && <GlyphSearchResult glyph={data.glyph} />}
        </Box>
      </HStack>
    </Page>
  );
};

export default New;
