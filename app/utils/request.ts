import { json, Response, type LoaderArgs } from '@remix-run/node';
import { validationError, type Validator } from 'remix-validated-form';
import { authenticator } from '~/session.server';

export const authGuard = async <TResult>(args: LoaderArgs, loader: (args: LoaderArgs) => TResult) => {
  const user = await authenticator.isAuthenticated(args.request);
  if (user == null) throw new Response('Not Found', { status: 404 });
  return loader(args);
};

export const checkedParamsLoader = async <TParams>(params: LoaderArgs['params'], validator: Validator<TParams>) => {
  const paramsResult = await validator.validate(params);
  if (paramsResult.error) {
    console.log(paramsResult.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  return paramsResult.data;
};

export const checkedQueryRequestLoader = async <TQuery, TResult>(
  request: LoaderArgs['request'],
  validator: Validator<TQuery>,
  result: (query: TQuery) => Promise<TResult>,
) => {
  const query = await validator.validate(new URL(request.url).searchParams);
  if (query.error) {
    console.log(query.error.fieldErrors);
    return validationError(query.error);
  }
  return json(await result(query.data));
};

export const checkedFormDataRequestLoader = async <TQuery, TResult>(
  request: LoaderArgs['request'],
  validator: Validator<TQuery>,
  result: (query: TQuery) => Promise<TResult>,
) => {
  const data = await validator.validate(await request.formData());
  if (data.error) {
    console.log(data.error.fieldErrors);
    return validationError(data.error);
  }
  return result(data.data);
};
