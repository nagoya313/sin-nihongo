import { type LoaderArgs, json } from '@remix-run/node';
import { getKanjisOrderByRead } from '~/features/kanjis/repositories.server';
import { checkedQuery } from '~/utils/request.server';
import { readKanjiQueryParams } from './validators';

export const index = ({ request }: LoaderArgs) =>
  checkedQuery(request, readKanjiQueryParams, async (query) => json({ kanjis: await getKanjisOrderByRead(query) }));
