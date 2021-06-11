import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import { ApiError, ApiMapping } from '@sin-nihongo/api-interfaces';

export const accessTokenHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const errorHandler = (error: unknown) => {
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
