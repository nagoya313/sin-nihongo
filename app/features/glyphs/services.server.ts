import { type ActionArgs, type LoaderArgs, json, redirect } from '@remix-run/node';
import { $path } from 'remix-routes';
import { validationError } from 'remix-validated-form';
import { createGlyph, deleteGlyph, getGlyphPreview, getGlyphs } from '~/features/glyphs/repositories.server';
import {
  glyphCreateParams,
  glyphDestroyParams,
  glyphPreviewParams,
  glyphQueryParams,
} from '~/features/glyphs/validators';
import { setFlashMessage } from '~/utils/flash.server';
import { checkedFormData, checkedQuery } from '~/utils/request.server';
import { getGlyphwiki } from '../glyphwiki/repositories.server';

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, glyphQueryParams);
  return json({ glyphs: await getGlyphs(query), offset: query.offset });
};

export const create = async (request: ActionArgs['request']) => {
  const data = await checkedFormData(request, glyphCreateParams);
  if (data.subaction == null) {
    const { isDrawable } = await getGlyphPreview(data.data);
    if (!isDrawable) return validationError({ fieldErrors: { data: '部品が足りません' } }, data);
  }
  try {
    await createGlyph(data);
  } catch {
    return validationError({ fieldErrors: { name: '登録済みです' }, subaction: data.subaction }, data);
  }
  const headers = await setFlashMessage(request, { message: 'グリフお登録しました', status: 'success' });
  if (data.subaction !== 'from-glyphwiki') return redirect($path('/glyphs'), headers);
  return json(await getGlyphwiki(data.q), headers);
};

export const destroy = async (request: ActionArgs['request']) => {
  const { name } = await checkedFormData(request, glyphDestroyParams);
  const { numDeletedRows } = await deleteGlyph(name);
  if (numDeletedRows === BigInt(1)) {
    return json({ name }, await setFlashMessage(request, { message: 'グリフお削除しました', status: 'success' }));
  }
  return json({ name: null }, await setFlashMessage(request, { message: 'グリフお削除しました', status: 'success' }));
};

export const getPreview = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, glyphPreviewParams);
  return json(await getGlyphPreview(query.data));
};
