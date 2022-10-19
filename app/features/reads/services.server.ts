import { json, type LoaderArgs } from '@remix-run/node';
import { checkedQuery } from '~/utils/request.server';
import { getKanjisOrderByRead } from './repositories.server';
import { readKanjiQueryParams } from './validators';

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, readKanjiQueryParams);
  return json({ kanjis: await getKanjisOrderByRead(query) });
};
