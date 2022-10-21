import { type ActionArgs, type LoaderArgs, Response, json, redirect } from '@remix-run/node';
import { $path } from 'remix-routes';
import {
  getRadicalByCodePoint,
  getRadicalsOrderByCodePoint,
  getRadicalsOrderByRead,
  getRadicalsOrderByStrokeCount,
  updateRadical,
} from '~/features/radicals/repositories.server';
import { radicalParams, radicalQueryParams, radicalUpdateParams } from '~/features/radicals/validators';
import { setFlashMessage } from '~/utils/flash.server';
import { checkedFormData, checkedParamsLoader, checkedQuery } from '~/utils/request.server';

export const index = async ({ request }: LoaderArgs) => {
  const query = await checkedQuery(request, radicalQueryParams);
  return json(
    query.orderBy === 'code_point'
      ? { radicals: await getRadicalsOrderByCodePoint(query) }
      : query.orderBy === 'read'
      ? { radicalsOrderByRead: await getRadicalsOrderByRead(query) }
      : { radicalsOrderByStrokeCount: await getRadicalsOrderByStrokeCount(query) },
  );
};

export const update = async ({ request, params }: ActionArgs) => {
  const data = await checkedFormData(request, radicalUpdateParams);
  const { codePoint } = await checkedParamsLoader(params, radicalParams);
  await updateRadical(codePoint, data);
  return redirect(
    $path('/radicals/:codePoint', { codePoint }),
    await setFlashMessage(request, { message: '部首の更新おしました', status: 'success' }),
  );
};

export const get = async ({ params }: LoaderArgs) => {
  const { codePoint } = await checkedParamsLoader(params, radicalParams);
  const radical = await getRadicalByCodePoint(codePoint);
  if (radical == null) throw new Response('Not Found', { status: 404 });
  return json(radical);
};
