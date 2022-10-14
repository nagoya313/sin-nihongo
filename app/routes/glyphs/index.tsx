import { HStack, Icon } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineFontDownload } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';
import Page from '~/components/Page';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import { GLYPH_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { glyphQueryParams } from '~/features/glyphs/validators/params';
import useSearch from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({
  title: '新日本語｜グリフ一覧',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await glyphQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return validationError(result.error);
  }
  return json({ glyphs: [] });
};

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(GLYPH_SEARCH_FORM_ID, glyphQueryParams, initialData);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />} title="グリフ一覧">
      <ValidatedForm {...searchProps}>
        <SearchPanel>
          <HStack align="center">
            <SearchFormControl name="name" label="なまえ">
              <TextInput name="name" />
            </SearchFormControl>
          </HStack>
        </SearchPanel>
      </ValidatedForm>
    </Page>
  );
};

export default Index;
