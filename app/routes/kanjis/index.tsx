import { HStack, Icon } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineTranslate } from 'react-icons/md';
import { Virtuoso } from 'react-virtuoso';
import { ValidatedForm } from 'remix-validated-form';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import KanjiItem from '~/features/kanjis/components/KanjiItem';
import ReadSearchInput from '~/features/kanjis/components/ReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import { KANJI_READ_LIMIT, KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import { getKanjisOrderByCodePoint } from '~/features/kanjis/models/kanji.server';
import { kanjiQueryParams, MAX_STOREKE_COUNT, MIN_STOREKE_COUNT } from '~/features/kanjis/validators/params';
import { useInfinitySearch } from '~/hooks/useSearch';
import { checkedQuery } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜新日本語漢字一覧' });

export const loader = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getKanjisOrderByCodePoint(query), offset: query.offset });
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
        <Virtuoso
          useWindowScroll
          data={data}
          endReached={moreLoad}
          itemContent={(index, kanji) => <KanjiItem kanji={kanji} isEven={index % 2 === 0} />}
        />
      </ValidatedForm>
    </Page>
  );
};

export default Index;
