import { type LoaderArgs, json } from '@remix-run/node';
import { getKanjisOrderByStrokeCount } from '~/features/kanjis/repositories.server';
import { checkedQuery } from '~/utils/request.server';
import { strokeCountKanjiQueryParams } from './validators';

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, strokeCountKanjiQueryParams);
  return json({ kanjis: await getKanjisOrderByStrokeCount(query) });
};
