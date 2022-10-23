import {
  type ActionArgs,
  type ActionFunction,
  type DataFunctionArgs,
  type LoaderArgs,
  type LoaderFunction,
  Response,
} from '@remix-run/node';
import { type Validator, type ValidatorData, validationError } from 'remix-validated-form';
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

export const checkedParamsLoader = async <TValidator extends Validator<any>>(
  params: LoaderArgs['params'],
  validator: TValidator,
) => {
  const paramsResult = await validator.validate(params);
  if (paramsResult.error) {
    console.log(paramsResult.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  return paramsResult.data as ValidatorData<TValidator>;
};

export const checkedQuery = async <TValidator extends Validator<any>>(
  request: LoaderArgs['request'],
  validator: TValidator,
) => {
  const query = await validator.validate(new URL(request.url).searchParams);
  if (query.error) {
    console.log(query.error.fieldErrors);
    throw validationError(query.error);
  }
  return query.data as ValidatorData<TValidator>;
};

export const checkedFormData = async <TValidator extends Validator<any>>(
  request: ActionArgs['request'],
  validator: TValidator,
) => {
  const data = await validator.validate(await request.formData());
  if (data.error) {
    console.log(data.error.fieldErrors);
    throw validationError(data.error);
  }
  return data.data as ValidatorData<TValidator>;
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
