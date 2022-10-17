import { json, type LoaderArgs } from '@remix-run/node';
import { getGlyphPreview } from '~/features/glyphs/models/glyph.server';
import { glyphPreviewParams } from '~/features/glyphs/validators/params';
import { authGuard, checkedQuery } from '~/utils/request.server';

export const loader = async ({ request }: LoaderArgs) => {
  await authGuard(request);
  const query = await checkedQuery(request, glyphPreviewParams);
  return json(await getGlyphPreview(query.data));
};
