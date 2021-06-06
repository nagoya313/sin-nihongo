import { AxiosError, AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import useAxios, { Options, RefetchOptions } from 'axios-hooks';
import { ApiError } from '@sin-nihongo/api-interfaces';

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

export const errorMessage = (error: AxiosError<ApiError>) => {
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

const useAxiosBase = <Response>(url: string, method: Method, options?: Options) =>
  useAxios<Response, ApiError>({ baseURL: url, method: method }, { ...options, useCache: false });

export const useAxiosGet = <Response>(url: string) => useAxiosBase<Response>(url, 'GET');

const useLazyAxiosBase = <Response>(url: string, method: Method, options?: Options) =>
  useAxiosBase<Response>(url, method, { ...options, manual: true });

export const useLazyAxiosGet = <Response>(url: string) => useLazyAxiosBase<Response>(url, 'GET');
export const useLazyAxiosPost = <Response>(url: string) => useLazyAxiosBase<Response>(url, 'POST');
export const useLazyAxiosPatch = <Response>(url: string) => useLazyAxiosBase<Response>(url, 'PATCH');
export const useLazyAxiosDelete = <Response>(url: string) => useLazyAxiosBase<Response>(url, 'DELETE');
