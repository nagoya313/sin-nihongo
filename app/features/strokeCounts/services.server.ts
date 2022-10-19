import { json, type LoaderArgs } from '@remix-run/node';
import { checkedQuery } from '~/utils/request.server';
import { getKanjisOrderByStrokeCount } from './repositories.server';
import { strokeCountKanjiQueryParams } from './validators';

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, strokeCountKanjiQueryParams);
  return json({ kanjis: await getKanjisOrderByStrokeCount(query) });
};
