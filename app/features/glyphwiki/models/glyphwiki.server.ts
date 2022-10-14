import axios from 'axios';

const GLYPHWIKI_API_ENDPOINT = 'https://glyphwiki.org/api/glyph';

type GlyphwikiData = Readonly<{
  version: number;
  name: string;
  data: string;
  related: string;
}>;

export const glyphwiki = async (name: string) => {
  const response = await axios.get<GlyphwikiData>(GLYPHWIKI_API_ENDPOINT, {
    params: { name: name },
  });
  console.log(response.data);
  // 見つからなかつた時？には{}だけではなく
  // {"version":null,"related":null,"data":null,"name":"uuuuuuu"}等
  // 等のjsonが返つてくることがある
  return !response.data.name || !response.data.data
    ? // responseを検討
      { name: name, error: 'グリフウィキからグリフが見つかりませんでした' }
    : // バージョン名@附きで検索結果を取得した場合、nameに@はつかないので検索codeの方を返す
      { name: name, data: response.data.data };
};
