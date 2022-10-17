import { redirect, type ActionArgs } from '@remix-run/node';
import { $path } from 'remix-routes';
import { validationError } from 'remix-validated-form';
import { createGlyph, getGlyphPreview } from '~/features/glyphs/models/glyph.server';
import { glyphCreateParams } from '~/features/glyphs/validators/params';
import { setFlashMessage } from '~/session.server';
import { authGuard, checkedFormData } from '~/utils/request.server';

export const action = async ({ request }: ActionArgs) => {
  await authGuard(request);
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
  const headers = await setFlashMessage(request, { message: 'グリフを登録しました', status: 'success' });
  return redirect($path('/kanjis'), headers);
};
