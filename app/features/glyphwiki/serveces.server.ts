import { type LoaderArgs, json } from '@remix-run/node';
import { checkedQuery } from '~/utils/request.server';
import { getGlyphwiki } from './repositories.server';
import { glyphwikiQueryParams } from './validators';

export const index = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, glyphwikiQueryParams);
  return json(await getGlyphwiki(query.q));
};
