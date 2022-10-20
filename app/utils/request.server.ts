import {
  type ActionArgs,
  type ActionFunction,
  type DataFunctionArgs,
  type LoaderArgs,
  Response,
} from '@remix-run/node';
import { type Validator, validationError } from 'remix-validated-form';
import { authenticator } from '~/session.server';

export const authGuard = async (request: DataFunctionArgs['request']) => {
  const user = await authenticator.isAuthenticated(request);
  if (user == null) throw new Response('Not Found', { status: 404 });
};

export const checkedParamsLoader = async <TParams>(params: LoaderArgs['params'], validator: Validator<TParams>) => {
  const paramsResult = await validator.validate(params);
  if (paramsResult.error) {
    console.log(paramsResult.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  return paramsResult.data;
};

export const checkedQuery = async <TQuery>(request: LoaderArgs['request'], validator: Validator<TQuery>) => {
  const query = await validator.validate(new URL(request.url).searchParams);
  if (query.error) {
    console.log(query.error.fieldErrors);
    throw validationError(query.error);
  }
  return query.data;
};

export const checkedFormData = async <TQuery>(request: ActionArgs['request'], validator: Validator<TQuery>) => {
  const data = await validator.validate(await request.formData());
  if (data.error) {
    console.log(data.error.fieldErrors);
    throw validationError(data.error);
  }
  return data.data;
};

type ActionResponse = ReturnType<ActionFunction>;

type Actions<TResponse extends ActionResponse> = Partial<Record<'POST' | 'PATCH' | 'DELETE', () => TResponse>>;

export const actionResponse = <TResponse extends ActionResponse>(
  request: ActionArgs['request'],
  actions: Actions<TResponse>,
) => {
  const service = actions[request.method as keyof typeof actions];
  if (service != null) return service();
  throw new Response('Method not allowed', { status: 405 });
};
