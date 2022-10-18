import { HStack, Icon } from '@chakra-ui/react';
import { json, Response, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import { Virtuoso } from 'react-virtuoso';
import { ValidatedForm, validationError } from 'remix-validated-form';
import BooleanSelectRadio from '~/components/BooleanSelectRadio';
import FormClearButton from '~/components/FormClearButton';
import FormControl from '~/components/FormControl';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import TextInput from '~/components/TextInput';
import { getGlyph, getGlyphByName, getGlyphPreview, updateGlyph } from '~/features/glyphs/models/glyph.server';
import ForNameSelectRadio from '~/features/kanjis/components/ForNameSelectRadio';
import JisLevelSelectRadio from '~/features/kanjis/components/JisLevelSelectRadio';
import KanjiItem from '~/features/kanjis/components/KanjiItem';
import RadicalSelectInput from '~/features/kanjis/components/RadicalSelectInput';
import ReadSearchInput from '~/features/kanjis/components/ReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import { KANJI_READ_LIMIT, KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import {
  createKanjiGlyph,
  getKanjiByCodePoint,
  getKanjis,
  unlinkKanjiGlyph,
} from '~/features/kanjis/models/kanji.server';
import {
  kanjiGlyphCreateParams,
  kanjiGlyphUnlinkParams,
  kanjiQueryParams,
  MAX_STOREKE_COUNT,
  MIN_STOREKE_COUNT,
} from '~/features/kanjis/validators/params';
import { useInfinitySearch } from '~/hooks/useSearch';
import GlyphLoader from '~/kage/GlyphLoader';
import { setFlashMessage } from '~/session.server';
import { authGuard, checkedFormData, checkedQuery } from '~/utils/request.server';

export const loader = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getKanjis(query), offset: query.offset });
};

const ACTIONS = Object.freeze({ POST: '登録', PATCH: '更新', DELETE: '外' });

export const action = async ({ request }: ActionArgs) => {
  await authGuard(request);
  let codePoint;
  if (request.method === 'POST' || request.method === 'PATCH') {
    const data = await checkedFormData(request, kanjiGlyphCreateParams);
    codePoint = data.codePoint;
    const { isDrawable } = await getGlyphPreview(data.data);
    if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' }, formId: data.formId }, data);
    try {
      if (request.method === 'POST') {
        await createKanjiGlyph(data);
      } else if (request.method === 'PATCH') {
        await updateGlyph(data);
      }
    } catch {
      return validationError({ fieldErrors: { name: '登録済みです' }, formId: data.formId }, data);
    }
  } else if (request.method === 'DELETE') {
    const data = await checkedFormData(request, kanjiGlyphUnlinkParams);
    codePoint = data.codePoint;
    await unlinkKanjiGlyph(data.codePoint);
  } else {
    throw new Response('Method not allowed', { status: 405 });
  }
  const kanji = (await getKanjiByCodePoint(codePoint))!;
  const glyph = kanji.glyph_name ? await getGlyphByName(kanji.glyph_name) : null;
  return json(
    {
      kanji: {
        ...kanji,
        glyph:
          glyph != null
            ? {
                ...glyph,
                drawNecessaryGlyphs: await new GlyphLoader(getGlyph).drawNecessaryGlyphs(glyph),
              }
            : null,
      },
    },
    {
      ...(await setFlashMessage(request, {
        message: `グリフを${ACTIONS[request.method]}しました`,
        status: 'success',
      })),
    },
  );
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
    <Page avatar={<Icon fontSize={24} as={MdOutlineTranslate} />} title="新日本語漢字一覧">
      <ValidatedForm {...formProps}>
        <SearchPanel align="stretch">
          <HStack align="center">
            <FormControl name="kanji" label="漢字" help="漢字またわコードポイントから検索できます。">
              <TextInput name="kanji" placeholder="一、u4e00" />
            </FormControl>
            <ReadSearchInput />
            <StrokeCountSearchInput min={MIN_STOREKE_COUNT} max={MAX_STOREKE_COUNT} />
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
