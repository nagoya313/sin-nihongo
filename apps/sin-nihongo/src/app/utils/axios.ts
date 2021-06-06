import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import useAxios, { RefetchOptions } from 'axios-hooks';
import { Error } from '@sin-nihongo/api-interfaces';

const accessTokenHeader = (token: string) => ({ Authorization: `Bearer ${token}` });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (error: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error.response);
  }
};

export const getAccessTokenOptions = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  audience: process.env.NX_API_IDENTIFIER!,
};

export const errorMessage = (error: AxiosError<Error>) => {
  if (error.response) {
    return error.response.data.message;
  }
  return error.message;
};

type Execute<Response> = (config?: AxiosRequestConfig, options?: RefetchOptions) => AxiosPromise<Response>;

export const fetch = <Params, Form, Response>(
  execute: Execute<Response>,
  wrapper: { new (params: Form): Params },
  data: Form,
  token: string
) => execute({ data: new wrapper(data), headers: accessTokenHeader(token) }).catch(errorHandler);

export const useAxiosGet = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'GET', // prodでビルドするとこゝを明示的に指定しないとtoUpperCase undefinedエラーになる
    },
    { useCache: false }
  );
};

export const useLazyAxiosGet = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'GET', // prodでビルドするとこゝを明示的に指定しないとtoUpperCase undefinedエラーになる
    },
    { useCache: false, manual: true }
  );
};

export const useLazyAxiosPost = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'POST',
    },
    { useCache: false, manual: true }
  );
};

export const useLazyAxiosDelete = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'DELETE',
    },
    { useCache: false, manual: true }
  );
};
