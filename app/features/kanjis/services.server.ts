import { json, Response, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { validationError } from 'remix-validated-form';
import {
  getDrawableGlyphByName,
  getGlyph,
  getGlyphByName,
  getGlyphPreview,
  updateGlyph,
} from '~/features/glyphs/repositories.server';
import GlyphLoader from '~/features/kage/models/GlyphLoader';
import {
  createKanjiGlyph,
  getKanjiByCodePoint,
  getKanjis,
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

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, kanjiQueryParams);
  return json({ kanjis: await getKanjis(query), offset: query.offset });
};

export const create = async (request: ActionArgs['request']) => {
  const data = await checkedFormData(request, kanjiGlyphCreateParams);
  const { isDrawable } = await getGlyphPreview(data.data);
  if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' }, formId: data.formId }, data);
  try {
    await createKanjiGlyph(data);
    const kanji = (await getKanjiByCodePoint(data.codePoint))!;
    const glyph = (await getGlyphByName(kanji.glyph_name!))!;
    const glyphLoader = new GlyphLoader(getGlyph);
    return json(
      {
        kanji: {
          ...kanji,
          glyph: { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) },
        },
      },
      await setFlashMessage(request, { message: 'グリフお登録しました', status: 'success' }),
    );
  } catch {
    return validationError({ fieldErrors: { name: '登録済みです' }, formId: data.formId }, data);
  }
};

export const update = async (request: ActionArgs['request']) => {
  const data = await checkedFormData(request, kanjiGlyphUpdateParams);
  const { isDrawable } = await getGlyphPreview(data.data);
  if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' }, formId: data.formId }, data);
  await updateGlyph(data);
  const kanji = (await getKanjiByCodePoint(data.codePoint))!;
  const glyph = (await getGlyphByName(kanji.glyph_name!))!;
  const glyphLoader = new GlyphLoader(getGlyph);
  return json(
    {
      kanji: {
        ...kanji,
        glyph: { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) },
      },
    },
    await setFlashMessage(request, { message: 'グリフお更新しました', status: 'success' }),
  );
};

export const destroy = async (request: ActionArgs['request']) => {
  const data = await checkedFormData(request, kanjiGlyphUnlinkParams);
  await unlinkKanjiGlyph(data.codePoint);
  const kanji = (await getKanjiByCodePoint(data.codePoint))!;
  return json(
    { kanji: { ...kanji, glyph: null } },
    { ...(await setFlashMessage(request, { message: 'グリフの関連お外しました', status: 'success' })) },
  );
};

export const getByCodePoint = async (params: LoaderArgs['params']) => {
  const { codePoint } = await checkedParamsLoader(params, kanjiParams);
  const kanji = await getKanjiByCodePoint(codePoint);
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
