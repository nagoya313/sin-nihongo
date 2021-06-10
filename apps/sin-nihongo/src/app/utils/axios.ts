import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import { ApiError, ApiMapping } from '@sin-nihongo/api-interfaces';

export const accessTokenHeader = (token: string) => ({ Authorization: `Bearer ${token}` });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (error: any) => {
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

export const useFetch = <Params, Response>(mapping: ApiMapping<Params, Response>, params?: Params) => {
  return useAxios<Response, ApiError>(
    { url: mapping.url, method: mapping.method, params: params },
    { manual: mapping.lazy, useCache: false }
  );
};
