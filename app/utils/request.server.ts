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

type LoaderResponse = ReturnType<LoaderFunction>;
type ActionResponse = ReturnType<ActionFunction>;

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

export const checkedQuery = async <TValidator extends Validator<any>, TResponse extends LoaderResponse>(
  request: LoaderArgs['request'],
  validator: TValidator,
  func: (query: ValidatorData<TValidator>) => TResponse,
) => {
  const query = await validator.validate(new URL(request.url).searchParams);
  if (query.error) {
    console.log(query.error.fieldErrors);
    return validationError(query.error);
  }
  return func(query.data);
};

export const checkedFormData = async <TValidator extends Validator<any>, TResponse extends ActionResponse>(
  request: ActionArgs['request'],
  validator: TValidator,
  func: (query: ValidatorData<TValidator>) => TResponse,
) => {
  const data = await validator.validate(await request.formData());
  if (data.error) {
    console.log(data.error.fieldErrors);
    return validationError(data.error);
  }
  return func(data.data);
};

type Actions<
  TPostResponse extends ActionResponse,
  TPatchResponse extends ActionResponse,
  TDeleteResponse extends ActionResponse,
> = Partial<{
  POST: (args: ActionArgs) => TPostResponse;
  PATCH: (args: ActionArgs) => TPatchResponse;
  DELETE: (args: ActionArgs) => TDeleteResponse;
}>;

export const actions =
  <
    TPostResponse extends ActionResponse = undefined,
    TPatchResponse extends ActionResponse = undefined,
    TDeleteResponse extends ActionResponse = undefined,
  >(
    actions: Actions<TPostResponse, TPatchResponse, TDeleteResponse>,
  ) =>
  (args: ActionArgs) => {
    const service = actions[args.request.method as keyof typeof actions];
    if (service != null) return service(args) as NonNullable<ReturnType<typeof service>>;
    throw new Response('Method not allowed', { status: 405 });
  };
