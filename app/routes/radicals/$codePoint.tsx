import { json, Response, type LoaderArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { validationError } from 'remix-validated-form';
import { radicalKanjiReadOrder, radicalKanjiStrokeCountOrder } from '~/features/kanjis/models/radicalKanji.server';
import { radicalKanjiQueryParams } from '~/features/kanjis/validators/params';
import { radical } from '~/features/radicals/models/radical.server';
import { radicalParams } from '~/features/radicals/validators/params';

export const loader = async ({ request, params }: LoaderArgs) => {
  const paramsResult = await radicalParams.validate(params);
  if (paramsResult.error) {
    console.log(paramsResult.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  const data = await radical(paramsResult.data.codePoint);
  if (data == null) throw new Response('Not Found', { status: 404 });
  const result = await radicalKanjiQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return json({ radical: data, kanjis: validationError(result.error) });
  }
  if (result.data.orderBy === 'read')
    return json({
      radical: data,
      kanjiReadOrder: await radicalKanjiReadOrder(paramsResult.data.codePoint, result.data),
    });
  return json({
    radical: data,
    kanjiStrokeCountOrder: await radicalKanjiStrokeCountOrder(paramsResult.data.codePoint, result.data),
  });
};

const Radical = () => <Outlet />;

export default Radical;
