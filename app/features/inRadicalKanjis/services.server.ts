import { type LoaderArgs, json } from '@remix-run/node';
import { radicalParams } from '~/features/radicals/validators';
import { checkedParamsLoader, checkedQuery } from '~/utils/request.server';
import {
  getInRadicalKanjisOrderByRead,
  getInRadicalKanjisOrderByStrokeCount,
} from '../inRadicalKanjis/repositories.server';
import { inRadicalKanjiQueryParams } from '../inRadicalKanjis/validators';

export const index = async ({ request, params }: LoaderArgs) => {
  const { codePoint } = await checkedParamsLoader(params, radicalParams);
  const query = await checkedQuery(request, inRadicalKanjiQueryParams);
  return json(
    query.orderBy === 'read'
      ? {
          kanjisOrderByRead: await getInRadicalKanjisOrderByRead(codePoint, query),
        }
      : {
          kanjisOrderByStrokeCount: await getInRadicalKanjisOrderByStrokeCount(codePoint, query),
        },
  );
};
