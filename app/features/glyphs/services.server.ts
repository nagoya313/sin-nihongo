import { type ActionArgs, type LoaderArgs, Response, json, redirect } from '@remix-run/node';
import { $path } from 'remix-routes';
import { validationError } from 'remix-validated-form';
import {
  createGlyph,
  deleteGlyph,
  getDrawableGlyphByName,
  getGlyphDetailByName,
  getGlyphPreview,
  getGlyphs,
  updateGlyph,
} from '~/features/glyphs/repositories.server';
import {
  glyphCreateParams,
  glyphDestroyParams,
  glyphParams,
  glyphPreviewParams,
  glyphUpdateParams,
  glyphsQueryParams,
} from '~/features/glyphs/validators';
import { getGlyphwiki } from '~/features/glyphwiki/repositories.server';
import { glyphToBuhin, toSVG } from '~/features/kage/models/kageData';
import { getKanjisByGlyphName } from '~/features/kanjis/repositories.server';
import { setFlashMessage } from '~/utils/flash.server';
import { checkedFormData, checkedParamsLoader, checkedQuery } from '~/utils/request.server';

export const index = ({ request }: LoaderArgs) =>
  checkedQuery(request, glyphsQueryParams, async (query) =>
    json({ glyphs: await getGlyphs(query), offset: query.offset }),
  );

export const create = ({ request }: ActionArgs) =>
  checkedFormData(request, glyphCreateParams, async (data) => {
    const { isDrawable } = await getGlyphPreview(data.data);
    if (!isDrawable) {
      if (data.subaction == null) return validationError({ fieldErrors: { data: '部品が足りません' } }, data);
      return json(
        {},
        { ...(await setFlashMessage(request, { message: '部品が足りません', status: 'error' })), status: 422 },
      );
    }
    try {
      await createGlyph(data);
    } catch {
      return validationError({ fieldErrors: { name: '登録済みです' }, subaction: data.subaction }, data);
    }
    const headers = await setFlashMessage(request, { message: 'グリフお登録しました', status: 'success' });
    if (data.subaction !== 'from-glyphwiki') return redirect($path('/glyphs'), headers);
    return json(await getGlyphwiki(data.q), headers);
  });

export const update = async ({ request, params }: ActionArgs) => {
  const { name } = await checkedParamsLoader(params, glyphParams);
  return checkedFormData(request, glyphUpdateParams, async (data) => {
    const { isDrawable } = await getGlyphPreview(data.data);
    if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' } }, data);
    await updateGlyph({ name, data: data.data });
    return json(
      { glyph: (await getDrawableGlyphByName(name))! },
      await setFlashMessage(request, { message: 'グリフお更新しました', status: 'success' }),
    );
  });
};

export const destroy = ({ request }: ActionArgs) =>
  checkedFormData(request, glyphDestroyParams, async (data) => {
    const { numDeletedRows } = await deleteGlyph(data.name);
    if (numDeletedRows === BigInt(1)) {
      return json(
        { name: data.name },
        await setFlashMessage(request, { message: 'グリフお削除しました', status: 'success' }),
      );
    }
    return json(
      { name: null },
      await setFlashMessage(request, { message: 'グリフの削除に失敗しました', status: 'error' }),
    );
  });

export const get = async ({ params }: LoaderArgs) => {
  const { name } = await checkedParamsLoader(params, glyphParams);
  const glyph = await getGlyphDetailByName(name);
  if (glyph == null) throw new Response('Not Found', { status: 404 });
  const buhin = glyphToBuhin(glyph);
  return json({
    glyph: {
      name: glyph.name,
      data: glyph.data,
      drawNecessaryGlyphs: glyph.drawNecessaryGlyphs,
      kanjis: await getKanjisByGlyphName(glyph.name),
    },
    includeGlyphs: glyph.drawNecessaryGlyphs.map((part) => ({
      name: part.name,
      html: toSVG(part.name, buhin),
    })),
    includedGlyphs: glyph.includedGlyphs.map((part) => ({
      name: part.name,
      html: toSVG(part.name, glyphToBuhin(part)),
    })),
  });
};

export const preview = ({ request }: LoaderArgs) =>
  checkedQuery(request, glyphPreviewParams, async ({ data }) => json(await getGlyphPreview(data)));
