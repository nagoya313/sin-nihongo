import { type ActionArgs, type LoaderArgs, Response, json, redirect } from '@remix-run/node';
import { $path } from 'remix-routes';
import { validationError } from 'remix-validated-form';
import { getDrawableGlyphByName, getGlyphPreview, updateGlyph } from '~/features/glyphs/repositories.server';
import {
  createKanjiGlyph,
  getDrawableKanji,
  getDrawableKanjis,
  getKanjiByCodePoint,
  getSameKanjs,
  linkKanjiGlyph,
  unlinkKanjiGlyph,
  updateKanji,
} from '~/features/kanjis/repositories.server';
import {
  kanjiGlyphCreateParams,
  kanjiGlyphUnlinkParams,
  kanjiGlyphUpdateParams,
  kanjiParams,
  kanjiQueryParams,
  kanjiUpdateParams,
} from '~/features/kanjis/validators';
import { setFlashMessage } from '~/utils/flash.server';
import { checkedFormData, checkedParamsLoader, checkedQuery } from '~/utils/request.server';
import { isErrorData } from '~/utils/typeCheck';

export const index = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getDrawableKanjis(query), offset: query.offset });
};

export const update = async ({ request, params }: ActionArgs) => {
  const { code_point } = await checkedParamsLoader(params, kanjiParams);
  const data = await checkedFormData(request, kanjiUpdateParams);
  if (isErrorData(data)) return data;
  await updateKanji(code_point, data);
  return redirect(
    $path('/kanjis'),
    await setFlashMessage(request, { message: '漢字お更新しました', status: 'success' }),
  );
};

const checkedKanjiData = async <TValidator extends typeof kanjiGlyphCreateParams | typeof kanjiGlyphUpdateParams>(
  request: ActionArgs['request'],
  validator: TValidator,
) => {
  const data = await checkedFormData(request, validator);
  const { isDrawable } = await getGlyphPreview(data.data);
  if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' }, formId: data.form_id }, data);
  return data;
};

export const createGlyph = async ({ request }: ActionArgs) => {
  const data = await checkedKanjiData(request, kanjiGlyphCreateParams);
  if (isErrorData(data)) return data;
  try {
    await createKanjiGlyph(data);
    return json(
      { kanji: await getDrawableKanji(data.code_point) },
      await setFlashMessage(request, { message: 'グリフお登録しました', status: 'success' }),
    );
  } catch {
    return validationError({ fieldErrors: { glyph_name: '登録済みです' }, formId: data.form_id }, data);
  }
};

export const updateKanjiGlyph = async ({ request }: ActionArgs) => {
  const data = await checkedKanjiData(request, kanjiGlyphUpdateParams);
  if (isErrorData(data)) return data;
  if (data.type === 'link') {
    await linkKanjiGlyph(data);
    return json(
      { kanji: await getDrawableKanji(data.code_point) },
      await setFlashMessage(request, { message: 'グリフお関連ずけました', status: 'success' }),
    );
  } else {
    await updateGlyph({ name: data.glyph_name, data: data.data });
    return json(
      { kanji: await getDrawableKanji(data.code_point) },
      await setFlashMessage(request, { message: 'グリフお更新しました', status: 'success' }),
    );
  }
};

export const unlinkGlyph = async ({ request }: ActionArgs) => {
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
