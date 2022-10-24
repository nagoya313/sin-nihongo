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

export const index = ({ request }: LoaderArgs) =>
  checkedQuery(request, radicalQueryParams, async (query) =>
    json(
      query.order_by === 'code_point'
        ? { radicals: await getRadicalsOrderByCodePoint(query) }
        : query.order_by === 'read'
        ? { radicalsOrderByRead: await getRadicalsOrderByRead(query) }
        : { radicalsOrderByStrokeCount: await getRadicalsOrderByStrokeCount(query) },
    ),
  );

export const update = async ({ request, params }: ActionArgs) => {
  const { code_point } = await checkedParamsLoader(params, radicalParams);
  return checkedFormData(request, radicalUpdateParams, async (data) => {
    await updateRadical(code_point, data);
    return redirect(
      $path('/radicals/:code_point', { code_point }),
      await setFlashMessage(request, { message: '部首の更新おしました', status: 'success' }),
    );
  });
};

export const get = async ({ params }: LoaderArgs) => {
  const { code_point } = await checkedParamsLoader(params, radicalParams);
  const radical = await getRadicalByCodePoint(code_point);
  if (radical == null) throw new Response('Not Found', { status: 404 });
  return json(radical);
};
