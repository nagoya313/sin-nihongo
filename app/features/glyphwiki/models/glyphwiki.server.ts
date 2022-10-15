import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import GlyphLoader from '~/kage/GlyphLoader';
import { type GlyphwikiData } from '../types';

const GLYPHWIKI_API_ENDPOINT = 'https://glyphwiki.org/api/glyph';

const getGlyphWikiGlyph = async (name: string) => {
  const response = await axios.get<GlyphwikiData>(GLYPHWIKI_API_ENDPOINT, { params: { name: name } });
  // 検索キーワードが不正な時は{}
  // その場合はnullを返す
  if (isEmpty(response.data)) return { name, data: null };
  // 見つからなかつた時は{"version":null,"related":null,"data":null,"name":"見つからない名前"}
  // が返つてくるらしい
  // バージョン@附きで検索結果を取得した場合、nameに@以降はつかない（バージョンはversionの方に入つてくる）
  return response.data.data != null ? { name, data: response.data.data } : { name, data: null };
};

export const getGlyphwiki = async (name: string) => {
  const glyph = await getGlyphWikiGlyph(name);
  if (glyph.data == null) return { ...glyph, drawNecessaryGlyphs: [] };
  const glyphLoader = new GlyphLoader((name) => getGlyphWikiGlyph(name));
  return { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) };
};
