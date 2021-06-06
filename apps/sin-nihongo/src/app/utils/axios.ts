import { AxiosError, AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import useAxios, { Options, RefetchOptions } from 'axios-hooks';
import { ApiError } from '@sin-nihongo/api-interfaces';
import { Length } from 'class-validator';

export const accessTokenHeader = (token: string) => ({ Authorization: `Bearer ${token}` });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (error: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
};

export const errorMessage = (error: AxiosError<ApiError>) => {
  if (error.response) {
    return error.response.data.message;
  }
  return error.message;
};

type Params = { [key: string]: string | number | boolean };

const checkedParams = (params?: Params) => {
  if (params) {
    const permitParams = Object.keys(params).reduce((acc, key) => {
      switch (typeof params[key]) {
        case 'number':
          if (Number.isNaN(params[key])) {
            break;
          }
        // eslint-disable-next-line no-fallthrough
        case 'string':
          if (!params[key]) {
            break;
          }
        // eslint-disable-next-line no-fallthrough
        case 'boolean':
          acc[key] = params[key];
      }
      return acc;
    }, {} as Params);
    return Object.keys(permitParams).length ? permitParams : undefined;
  }
  return undefined;
};

type Execute<Response> = (config?: AxiosRequestConfig, options?: RefetchOptions) => AxiosPromise<Response>;

export const fetch = <Response>(execute: Execute<Response>) => execute().catch(errorHandler);
export const fetchWithToken = <Response>(execute: Execute<Response>, token: string) =>
  execute({ headers: accessTokenHeader(token) }).catch(errorHandler);
export const fetchWithTokenAndData = <Params, Response>(execute: Execute<Response>, token: string, data: Params) =>
  execute({ headers: accessTokenHeader(token), data: data }).catch(errorHandler);

const useAxiosBase = <Response>(url: string, method: Method, config?: AxiosRequestConfig, options?: Options) =>
  useAxios<Response, ApiError>(
    { ...config, params: checkedParams(config?.params), url: url, method: method },
    { ...options, useCache: false }
  );

export const useAxiosGet = <Response>(url: string, config?: AxiosRequestConfig) =>
  useAxiosBase<Response>(url, 'GET', config);

const useLazyAxiosBase = <Response>(url: string, method: Method, config?: AxiosRequestConfig, options?: Options) =>
  useAxiosBase<Response>(url, method, config, { ...options, manual: true });

export const useLazyAxiosGet = <Response>(url: string, config?: AxiosRequestConfig) =>
  useLazyAxiosBase<Response>(url, 'GET', config);
export const useLazyAxiosPost = <Response>(url: string) => useLazyAxiosBase<Response>(url, 'POST');
export const useLazyAxiosPatch = <Response>(url: string) => useLazyAxiosBase<Response>(url, 'PATCH');
export const useLazyAxiosDelete = <Response>(url: string) => useLazyAxiosBase<Response>(url, 'DELETE');
