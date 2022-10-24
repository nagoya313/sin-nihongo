import { type LoaderArgs, json } from '@remix-run/node';
import { checkedQuery } from '~/utils/request.server';
import { getGlyphwiki } from './repositories.server';
import { glyphwikiQueryParams } from './validators';

export const index = async ({ request }: LoaderArgs) =>
  checkedQuery(request, glyphwikiQueryParams, async ({ q }) => json(await getGlyphwiki(q)));
