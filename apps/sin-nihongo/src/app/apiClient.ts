import {
  createClient,
  RequestInterceptor,
  ResponseInterceptor,
  useQuery,
  useMutation,
  useSuspenseQuery,
} from 'react-fetching-library';
import { ErrorResponse, routePrefix } from '@sin-nihongo/api-interfaces';
import { ApiAction } from './routes';

export const requestHostInterceptor: RequestInterceptor = () => async (action) => ({
  ...action,
  endpoint: `${routePrefix}${action.endpoint}`,
});

export const responseInterceptor: ResponseInterceptor = () => async (_action, response) => {
  if (response.error) {
    return {
      ...response,
      payload: { ...response.payload, errorResponse: true }, // 型ガード用に余分情報を附ける
    };
  }
  return response;
};

export const apiClient = createClient({
  requestInterceptors: [requestHostInterceptor],
  responseInterceptors: [responseInterceptor],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorResponse = (response: any): response is ErrorResponse =>
  typeof response.errorResponse !== 'undefined';