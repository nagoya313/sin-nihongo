import { redirect, type ActionArgs } from '@remix-run/node';
import { $params, $path } from 'remix-routes';
import { deleteGlyph } from '~/features/glyphs/models/glyph.server';
import { setFlashMessage } from '~/utils/flash.server';
import { authGuard } from '~/utils/request.server';

export const action = async ({ request, params }: ActionArgs) => {
  await authGuard(request);
  const { numDeletedRows } = await deleteGlyph($params('/glyphs/:name/delete', params).name);
  return redirect(
    $path('/glyphs'),
    await setFlashMessage(
      request,
      numDeletedRows === BigInt(1)
        ? { message: 'グリフを削除しました', status: 'success' }
        : { message: 'グリフを削除できませんでした', status: 'error' },
    ),
  );
};
