import { type LoaderArgs, json } from '@remix-run/node';
import { getKanjisOrderByStrokeCount } from '~/features/kanjis/repositories.server';
import { checkedQuery } from '~/utils/request.server';
import { strokeCountKanjiQueryParams } from './validators';

export const index = ({ request }: LoaderArgs) =>
  checkedQuery(request, strokeCountKanjiQueryParams, async (query) =>
    json({ kanjis: await getKanjisOrderByStrokeCount(query) }),
  );
