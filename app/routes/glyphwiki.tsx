import { type LoaderArgs } from '@remix-run/node';
import { getGlyphwiki } from '~/features/glyphwiki/models/glyphwiki.server';
import { glyphwikiQueryParams } from '~/features/glyphwiki/validators/params';
import { checkedQueryRequestLoader } from '~/utils/request';

export const loader = async ({ request }: LoaderArgs) =>
  checkedQueryRequestLoader(request, glyphwikiQueryParams, async (query) => ({
    glyph: await getGlyphwiki(query.q),
  }));
