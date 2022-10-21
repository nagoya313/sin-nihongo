import {
  type ActionArgs,
  type ActionFunction,
  type DataFunctionArgs,
  type LoaderArgs,
  type LoaderFunction,
  Response,
} from '@remix-run/node';
import { type Validator, validationError } from 'remix-validated-form';
import { authenticator } from '~/session.server';

export const authGuard = async <TFunction extends LoaderFunction | ActionFunction>(
  args: DataFunctionArgs,
  func: TFunction,
) => {
  const user = await authenticator.isAuthenticated(args.request);
  if (user == null) throw new Response('Not Found', { status: 404 });
  // 明示的にキャストしないと Promise<any> 等に推論される
  return func(args) as ReturnType<TFunction>;
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

type Actions<TResponse extends ActionResponse> = Partial<
  Record<'POST' | 'PATCH' | 'DELETE', (args: ActionArgs) => TResponse>
>;

export const actions =
  <TResponse extends ActionResponse>(actions: Actions<TResponse>) =>
  (args: ActionArgs) => {
    const service = actions[args.request.method as keyof typeof actions];
    if (service != null) return service(args);
    throw new Response('Method not allowed', { status: 405 });
  };
