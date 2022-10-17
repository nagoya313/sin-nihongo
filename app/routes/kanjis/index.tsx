import { HStack, Icon } from '@chakra-ui/react';
import { json, type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineTranslate } from 'react-icons/md';
import { Virtuoso } from 'react-virtuoso';
import { ValidatedForm, validationError } from 'remix-validated-form';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import { getGlyphPreview } from '~/features/glyphs/models/glyph.server';
import KanjiItem from '~/features/kanjis/components/KanjiItem';
import ReadSearchInput from '~/features/kanjis/components/ReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import { KANJI_READ_LIMIT, KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import { createKanjiGlyph, getKanjis } from '~/features/kanjis/models/kanji.server';
import {
  kanjiGlyphCreateParams,
  kanjiQueryParams,
  MAX_STOREKE_COUNT,
  MIN_STOREKE_COUNT,
} from '~/features/kanjis/validators/params';
import { useInfinitySearch } from '~/hooks/useSearch';
import { setFlashMessage } from '~/session.server';
import { authGuard, checkedFormData, checkedQuery } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜新日本語漢字一覧' });

export const loader = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getKanjis(query), offset: query.offset });
};

export const action = async ({ request }: ActionArgs) => {
  await authGuard(request);
  const data = await checkedFormData(request, kanjiGlyphCreateParams);
  const { isDrawable } = await getGlyphPreview(data.data);
  if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' }, formId: data.formId }, data);
  try {
    await createKanjiGlyph(data);
  } catch {
    return validationError({ fieldErrors: { name: '登録済みです' }, formId: data.formId }, data);
  }
  const headers = await setFlashMessage(request, { message: 'グリフを登録しました', status: 'success' });
  return json('ok', headers);
};

const Index = () => {
  const { data, formProps, moreLoad } = useInfinitySearch({
    key: 'kanjis',
    formId: KANJI_SEARCH_FORM_ID,
    validator: kanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
    readLimit: KANJI_READ_LIMIT,
  });

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineTranslate} />} title="新日本語漢字一覧">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <ReadSearchInput />
            <StrokeCountSearchInput min={MIN_STOREKE_COUNT} max={MAX_STOREKE_COUNT} />
            <RegularSelectRadio />
          </HStack>
        </SearchPanel>
      </ValidatedForm>
      <Virtuoso
        useWindowScroll
        data={data}
        endReached={moreLoad}
        itemContent={(index, kanji) => <KanjiItem kanji={kanji} isEven={index % 2 === 0} />}
      />
    </Page>
  );
};

export default Index;
