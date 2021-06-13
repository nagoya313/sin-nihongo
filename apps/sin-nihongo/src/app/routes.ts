import { Action } from 'react-fetching-library';
import qs from 'qs';
import {
  ErrorResponse,
  GetGlyphwikiRequest,
  GetRadicalsRequest,
  GlyphResponse,
  InfosResponse,
  MessageResponse,
  PaginationRequest,
  PaginationResponse,
  PostGlyphRequest,
  RadicalResponse,
} from '@sin-nihongo/api-interfaces';

const accessTokenHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export type ApiResponse<T> = T | ErrorResponse;
export type ApiAction<T> = Action<T | ErrorResponse>;

export const fetchInfos: ApiAction<InfosResponse> = { method: 'GET', endpoint: '/infos' };
export const fetchGlyphwiki = (params: GetGlyphwikiRequest): ApiAction<GlyphResponse> => ({
  method: 'GET',
  endpoint: `/glyphwiki?${qs.stringify(params)}`,
});
export const fetchRadicals = (
  params?: GetRadicalsRequest & PaginationRequest
): ApiAction<PaginationResponse<RadicalResponse>> => ({
  method: 'GET',
  endpoint: `/radicals?${qs.stringify(params)}`,
});
export const fetchAddGlyph = (formValues: { body: PostGlyphRequest; token: string }): ApiAction<MessageResponse> => ({
  method: 'POST',
  endpoint: '/glyphs',
  body: formValues.body,
  headers: accessTokenHeader(formValues.token),
});
