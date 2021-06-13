import { Action } from 'react-fetching-library';
import * as qs from 'qs';
import { ErrorResponse, GetGlyphwikiRequest, GlyphResponse, InfosResponse } from '@sin-nihongo/api-interfaces';

export type ApiResponse<T> = T | ErrorResponse;
export type ApiAction<T> = Action<T | ErrorResponse>;

export const fetchInfos: ApiAction<InfosResponse> = { method: 'GET', endpoint: '/infos' };
export const fetchGlyphwiki = (params: GetGlyphwikiRequest): ApiAction<GlyphResponse> => ({
  method: 'GET',
  endpoint: `/glyphwiki?${qs.stringify(params)}`,
});
