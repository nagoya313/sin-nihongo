import { type ActionArgs, type LoaderArgs, Response, json } from '@remix-run/node';
import { validationError } from 'remix-validated-form';
import { getDrawableGlyphByName, getGlyphPreview, updateGlyph } from '~/features/glyphs/repositories.server';
import {
  createKanjiGlyph,
  getDrawableKanji,
  getDrawableKanjis,
  getKanjiByCodePoint,
  getSameKanjs,
  unlinkKanjiGlyph,
} from '~/features/kanjis/repositories.server';
import {
  kanjiGlyphCreateParams,
  kanjiGlyphUnlinkParams,
  kanjiGlyphUpdateParams,
  kanjiParams,
  kanjiQueryParams,
} from '~/features/kanjis/validators';
import { setFlashMessage } from '~/utils/flash.server';
import { checkedFormData, checkedParamsLoader, checkedQuery } from '~/utils/request.server';
import { isErrorData } from '~/utils/typeCheck';

export const index = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getDrawableKanjis(query), offset: query.offset });
};

const checkedKanjiData = async (
  request: ActionArgs['request'],
  validator: typeof kanjiGlyphCreateParams | typeof kanjiGlyphUpdateParams,
) => {
  const data = await checkedFormData(request, validator);
  const { isDrawable } = await getGlyphPreview(data.data);
  if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' }, formId: data.form_id }, data);
  return data;
};

export const create = async ({ request }: ActionArgs) => {
  const data = await checkedKanjiData(request, kanjiGlyphCreateParams);
  if (isErrorData(data)) return data;
  try {
    await createKanjiGlyph(data);
    return json(
      { kanji: await getDrawableKanji(data.code_point) },
      await setFlashMessage(request, { message: 'グリフお登録しました', status: 'success' }),
    );
  } catch {
    return validationError({ fieldErrors: { name: '登録済みです' }, formId: data.form_id }, data);
  }
};

export const update = async ({ request }: ActionArgs) => {
  const data = await checkedKanjiData(request, kanjiGlyphUpdateParams);
  if (isErrorData(data)) return data;
  await updateGlyph({ name: data.glyph_name, data: data.data });
  return json(
    { kanji: await getDrawableKanji(data.code_point) },
    await setFlashMessage(request, { message: 'グリフお更新しました', status: 'success' }),
  );
};

export const destroy = async ({ request }: ActionArgs) => {
  const { code_point } = await checkedFormData(request, kanjiGlyphUnlinkParams);
  await unlinkKanjiGlyph(code_point);
  const kanji = (await getKanjiByCodePoint(code_point))!;
  return json(
    { kanji: { ...kanji, glyph: null } },
    { ...(await setFlashMessage(request, { message: 'グリフの関連お外しました', status: 'success' })) },
  );
};

export const get = async ({ params }: LoaderArgs) => {
  const { code_point } = await checkedParamsLoader(params, kanjiParams);
  const kanji = await getKanjiByCodePoint(code_point);
  if (kanji == null) throw new Response('Not Found', { status: 404 });
  return json(
    kanji.glyph_name != null
      ? {
          kanji,
          glyph: await getDrawableGlyphByName(kanji.glyph_name),
          sames: (await getSameKanjs(kanji)).map(({ kanji }) => kanji),
        }
      : { kanji, glyph: null, sames: [] },
  );
};
