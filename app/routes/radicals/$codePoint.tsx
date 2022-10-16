import { json, Response, type LoaderArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import {
  getRadicalKanjisOrderByRead,
  getRadicalKanjisOrderByStrokeCount,
} from '~/features/kanjis/models/radicalKanji.server';
import { radicalKanjiQueryParams } from '~/features/kanjis/validators/params';
import { getRadicalByCodePoint } from '~/features/radicals/models/radical.server';
import { radicalParams } from '~/features/radicals/validators/params';
import { checkedParamsLoader } from '~/utils/request.server';

export const loader = async ({ request, params }: LoaderArgs) => {
  const { codePoint } = await checkedParamsLoader(params, radicalParams);
  const radical = await getRadicalByCodePoint(codePoint);
  if (radical == null) throw new Response('Not Found', { status: 404 });
  const query = await radicalKanjiQueryParams.validate(new URL(request.url).searchParams);
  if (query.error) {
    console.log(query.error.fieldErrors);
    return json({ radical, kanjis: validationError(query.error) });
  }
  return json(
    query.data.orderBy === 'read'
      ? {
          radical,
          kanjisOrderByRead: await getRadicalKanjisOrderByRead(codePoint, query.data),
        }
      : {
          radical,
          kanjisOrderByStrokeCount: await getRadicalKanjisOrderByStrokeCount(codePoint, query.data),
        },
  );
};

const Radical = () => <Outlet />;

export default Radical;
