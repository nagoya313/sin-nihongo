import { HStack, Icon } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ValidatedForm } from 'remix-validated-form';
import BooleanSelectRadio from '~/components/BooleanSelectRadio';
import FormClearButton from '~/components/FormClearButton';
import FormControl from '~/components/FormControl';
import { KanjiIcon } from '~/components/icons';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import TextInput from '~/components/TextInput';
import ForNameSelectRadio from '~/features/kanjis/components/ForNameSelectRadio';
import JisLevelSelectRadio from '~/features/kanjis/components/JisLevelSelectRadio';
import KanjiItem from '~/features/kanjis/components/KanjiItem';
import KanjiReadSearchInput from '~/features/kanjis/components/KanjiReadSearchInput';
import RadicalSelectInput from '~/features/kanjis/components/RadicalSelectInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import { KANJI_READ_LIMIT, KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import { create, destroy, get, update } from '~/features/kanjis/services.server';
import { kanjiQueryParams, MAX_STOROKE_COUNT, MIN_STOROKE_COUNT } from '~/features/kanjis/validators';
import { useInfinitySearch } from '~/hooks/useSearch';
import { actionResponse, authGuard } from '~/utils/request.server';
export const meta: MetaFunction = () => ({ title: '新日本語｜漢字一覧' });
export const loader = async ({ request }: LoaderArgs) => get(request);

export const action = async ({ request }: ActionArgs) => {
  await authGuard(request);
  return actionResponse(request, {
    POST: () => create(request),
    PATCH: () => update(request),
    DELETE: () => destroy(request),
  });
};

const Index = () => {
  const { data, formProps, moreLoad, setData } = useInfinitySearch({
    key: 'kanjis',
    formId: KANJI_SEARCH_FORM_ID,
    validator: kanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
    readLimit: KANJI_READ_LIMIT,
  });

  const updated = useActionData<typeof action>();

  useEffect(() => {
    if (updated != null && 'kanji' in updated) {
      setData(data.map((kanji) => (kanji.code_point === updated.kanji.code_point ? updated.kanji : kanji)));
    }
    // updatedが變化した時だけdataを上書きしたいのでdataの變化は見なくてよい
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <Page avatar={<Icon fontSize={24} as={KanjiIcon} />} title="新日本語漢字一覧">
      <ValidatedForm {...formProps}>
        <SearchPanel align="stretch">
          <HStack align="center">
            <FormControl name="kanji" label="漢字" help="漢字またわコードポイントから検索できます。">
              <TextInput name="kanji" placeholder="一、u4e00" />
            </FormControl>
            <KanjiReadSearchInput />
            <StrokeCountSearchInput min={MIN_STOROKE_COUNT} max={MAX_STOROKE_COUNT} />
            <RadicalSelectInput />
          </HStack>
          <HStack align="center">
            <RegularSelectRadio />
            <ForNameSelectRadio />
            <JisLevelSelectRadio />
          </HStack>
          <HStack align="center">
            <BooleanSelectRadio
              name="hasGlyph"
              label="グリフ実装"
              labels={[
                { key: 'none', label: '指定なし' },
                { key: 'true', label: '実装済み' },
                { key: 'false', label: '未実装' },
              ]}
            />
            <FormClearButton />
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
