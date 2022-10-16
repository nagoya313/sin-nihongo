import { HStack, Icon } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MdBuild, MdOutlineFontDownload } from 'react-icons/md';
import { Virtuoso } from 'react-virtuoso';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import AdminLinkButton from '~/components/AdminLinkButton';
import FormControl from '~/components/FormControl';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import GlyphItem from '~/features/glyphs/components/GlyphItem';
import { GLYPH_READ_LIMIT, GLYPH_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { getGlyphs } from '~/features/glyphs/models/glyph.server';
import { glyphQueryParams } from '~/features/glyphs/validators/params';
import { useSearch } from '~/hooks/useSearch';
import { authGuard, checkedQuery } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜グリフ一覧' });

export const loader = async ({ request }: LoaderArgs) => {
  await authGuard(request);
  const query = await checkedQuery(request, glyphQueryParams);
  return json({ glyphs: await getGlyphs(query), offset: query.offset });
};

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, formProps, getValues } = useSearch({
    formId: GLYPH_SEARCH_FORM_ID,
    validator: glyphQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });
  const [glyphs, setGlyphs] = useState<Awaited<ReturnType<typeof getGlyphs>>>([]);
  const glyphMoreLoad = () => {
    if ('glyphs' in data && data.glyphs.length === GLYPH_READ_LIMIT) {
      const formData = getValues();
      formData.set('offset', (data.offset + 20).toString());
      formProps.fetcher.submit(formData);
    }
  };
  useEffect(() => {
    if ('glyphs' in data) {
      setGlyphs(data.offset ? (prev) => [...prev, ...data.glyphs] : data.glyphs);
    }
  }, [data]);
  useEffect(() => {
    if ('glyphs' in initialData) {
      setGlyphs(initialData.glyphs);
    }
  }, [initialData]);

  return (
    <Page
      avatar={<Icon fontSize={24} as={MdOutlineFontDownload} />}
      title="グリフ一覧"
      action={<AdminLinkButton aria-label="glyph-build" icon={<MdBuild />} to={$path('/glyphs/new')} />}
    >
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <FormControl name="name" label="なまえ">
              <TextInput name="name" />
            </FormControl>
          </HStack>
        </SearchPanel>
      </ValidatedForm>
      <Virtuoso
        useWindowScroll
        data={glyphs}
        endReached={glyphMoreLoad}
        itemContent={(index, glyph) => <GlyphItem glyph={glyph} isEven={index % 2 === 0} />}
      />
    </Page>
  );
};

export default Index;
