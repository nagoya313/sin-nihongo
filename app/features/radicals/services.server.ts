import { json, redirect, Response, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { $params, $path } from 'remix-routes';
import {
  getRadicalByCodePoint,
  getRadicalKanjisOrderByRead,
  getRadicalKanjisOrderByStrokeCount,
  getRadicalsOrderByCodePoint,
  getRadicalsOrderByRead,
  getRadicalsOrderByStrokeCount,
} from '~/features/radicals/repositories.server';
import {
  radicalKanjiQueryParams,
  radicalParams,
  radicalQueryParams,
  radicalUpdateParams,
} from '~/features/radicals/validators';
import { setFlashMessage } from '~/utils/flash.server';
import { checkedFormData, checkedParamsLoader, checkedQuery } from '~/utils/request.server';

export const get = async (request: LoaderArgs['request']) => {
  const query = await checkedQuery(request, radicalQueryParams);
  return json(
    query.orderBy === 'code_point'
      ? { radicals: await getRadicalsOrderByCodePoint(query) }
      : query.orderBy === 'read'
      ? { radicalsOrderByRead: await getRadicalsOrderByRead(query) }
      : { radicalsOrderByStrokeCount: await getRadicalsOrderByStrokeCount(query) },
  );
};

export const update = async (request: ActionArgs['request'], params: ActionArgs['params']) => {
  await checkedFormData(request, radicalUpdateParams);
  const { codePoint } = $params('/radicals/:codePoint', params);
  return redirect(
    $path('/radicals/:codePoint', { codePoint }),
    await setFlashMessage(request, { message: '部首の更新おしました', status: 'success' }),
  );
};

export const getByCodePoint = async ({ params }: LoaderArgs) => {
  const { codePoint } = await checkedParamsLoader(params, radicalParams);
  const radical = await getRadicalByCodePoint(codePoint);
  if (radical == null) throw new Response('Not Found', { status: 404 });
  return json(radical);
};

export const getRadicalKanji = async ({ request, params }: LoaderArgs) => {
  const { codePoint } = await checkedParamsLoader(params, radicalParams);
  const query = await checkedQuery(request, radicalKanjiQueryParams);
  return json(
    query.orderBy === 'read'
      ? { kanjisOrderByRead: await getRadicalKanjisOrderByRead(codePoint, query) }
      : { kanjisOrderByStrokeCount: await getRadicalKanjisOrderByStrokeCount(codePoint, query) },
  );
};