import { type LoaderArgs, json } from '@remix-run/node';
import { checkedQuery } from '~/utils/request.server';
import { getGlyphwiki } from './repositories.server';
import { glyphwikiQueryParams } from './validators';

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, glyphwikiQueryParams);
  return json(await getGlyphwiki(query.q));
};
