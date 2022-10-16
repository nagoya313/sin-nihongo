import { json, type LoaderArgs } from '@remix-run/node';
import { getGlyphwiki } from '~/features/glyphwiki/models/glyphwiki.server';
import { glyphwikiQueryParams } from '~/features/glyphwiki/validators/params';
import { checkedQuery } from '~/utils/request.server';

export const loader = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, glyphwikiQueryParams);
  return json({ glyph: await getGlyphwiki(query.q) });
};
