import { redirect, type ActionArgs } from '@remix-run/node';
import { $params, $path } from 'remix-routes';
import { deleteGlyph } from '~/features/glyphs/models/glyph.server';
import { authGuard } from '~/utils/request';

export const action = async (args: ActionArgs) =>
  authGuard(args, async ({ params }) => {
    await deleteGlyph($params('/glyphs/:name/delete', params).name);
    return redirect($path('/glyphs'));
  });
