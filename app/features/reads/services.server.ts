import { type LoaderArgs, json } from '@remix-run/node';
import { getKanjisOrderByRead } from '~/features/kanjis/repositories.server';
import { checkedQuery } from '~/utils/request.server';
import { readKanjiQueryParams } from './validators';

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, readKanjiQueryParams);
  return json({ kanjis: await getKanjisOrderByRead(query) });
};
