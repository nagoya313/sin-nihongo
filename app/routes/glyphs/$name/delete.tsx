import { redirect, type ActionArgs } from '@remix-run/node';
import { $params, $path } from 'remix-routes';
import { deleteGlyph } from '~/features/glyphs/models/glyph.server';

export const action = async ({ params }: ActionArgs) => {
  await deleteGlyph($params('/glyphs/:name/delete', params).name);
  return redirect($path('/glyphs'));
};
