import { HStack, Icon } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdBuild, MdOutlineFontDownload } from 'react-icons/md';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import AdminLinkButton from '~/components/AdminLinkButton';
import FormControl from '~/components/FormControl';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import { GLYPH_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { getGlyphs } from '~/features/glyphs/models/glyph.server';
import { glyphQueryParams } from '~/features/glyphs/validators/params';
import useSearch from '~/hooks/useSearch';
import { checkedQueryRequestLoader } from '~/utils/request';

export const meta: MetaFunction = () => ({
  title: '新日本語｜グリフ一覧',
});

export const loader = async ({ request }: LoaderArgs) =>
  checkedQueryRequestLoader(request, glyphQueryParams, async (query) => ({ glyphs: await getGlyphs(query) }));

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(GLYPH_SEARCH_FORM_ID, glyphQueryParams, initialData);

  return (
    <Page
      avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />}
      title="グリフ一覧"
      action={<AdminLinkButton aria-label="glyph-build" icon={<MdBuild />} to={$path('/glyphs/new')} />}
    >
      <ValidatedForm {...searchProps}>
        <SearchPanel>
          <HStack align="center">
            <FormControl name="name" label="なまえ">
              <TextInput name="name" />
            </FormControl>
          </HStack>
        </SearchPanel>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
