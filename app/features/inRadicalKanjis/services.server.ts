import { type LoaderArgs, json } from '@remix-run/node';
import { radicalParams } from '~/features/radicals/validators';
import { checkedParamsLoader, checkedQuery } from '~/utils/request.server';
import {
  getInRadicalKanjisOrderByRead,
  getInRadicalKanjisOrderByStrokeCount,
} from '../inRadicalKanjis/repositories.server';
import { inRadicalKanjiQueryParams } from '../inRadicalKanjis/validators';

export const index = async ({ request, params }: LoaderArgs) => {
  const { code_point } = await checkedParamsLoader(params, radicalParams);
  return checkedQuery(request, inRadicalKanjiQueryParams, async (query) =>
    json(
      query.order_by === 'read'
        ? {
            kanjisOrderByRead: await getInRadicalKanjisOrderByRead(code_point, query),
          }
        : {
            kanjisOrderByStrokeCount: await getInRadicalKanjisOrderByStrokeCount(code_point, query),
          },
    ),
  );
};
