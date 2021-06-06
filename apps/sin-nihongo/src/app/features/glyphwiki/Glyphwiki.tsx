import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Buhin } from '@kurgm/kage-engine';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER, Glyph } from '@sin-nihongo/api-interfaces';
import { CardHeader } from '../../components/CardHeader';
import { NewTabLink } from '../../components/NewTabLink';
import { ResponseNotice } from '../../components/ResponseNotice';
import { SearchTextField } from '../../components/SearchTextField';
import { SubText } from '../../components/SubText';
import { Text } from '../../components/Text';
import { useLazyAxiosGet } from '../../utils/axios';
import { GlyphwikiContent } from './GlyphwikiContent';

const validation = (word: string) => word.match(GLYPHWIKI_QUERY_PARAMS_MATCHER) !== null || word === '';

export const Glyphwiki = () => {
  const [searchWord, setSearchWord] = useState('');
  const [{ data, loading, error }, refetch] = useLazyAxiosGet<Glyph>('api/v1/glyphwiki');
  const [kageData, setKageData] = useState<Glyph>();
  const [buhin, setBuhin] = useState(new Buhin());

  useEffect(() => {
    if (searchWord) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      refetch({ params: { q: searchWord } }).catch(() => {});
    }
  }, [refetch, searchWord]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setKageData(undefined);
      } else if (typeof data !== 'undefined') {
        setKageData(data);
        const b = new Buhin();
        if (data) {
          b.push(data.name, data.data);
          data.includeGlyphs?.forEach((glyph) => {
            b.push(glyph.name, glyph.data);
          });
        }
        setBuhin(b);
      }
    }
  }, [data, loading, error]);

  return (
    <Card>
      <CardHeader avatarText="字" title="グリフウィキ検索" />
      <CardContent>
        <Text>
          <NewTabLink
            url="https://glyphwiki.org/wiki/GlyphWiki:%e3%83%a1%e3%82%a4%e3%83%b3%e3%83%9a%e3%83%bc%e3%82%b8"
            text="グリフウィキ"
          />
          からグリフお検索します。漢字一文字或いわグリフウィキのグリフ名から検索できます。
        </Text>
        <SearchTextField
          label="漢字・USC・グリフ名"
          onSearchWordChange={setSearchWord}
          validation={validation}
          hint="例：一、u4e00、aj1-10186"
          errorMessage="検索ワードが不正です"
        />
        <Divider />
        <ResponseNotice loading={loading} error={error} />
        {kageData?.name && (
          <React.Fragment>
            <GlyphwikiContent name={kageData?.name} data={kageData?.data} buhin={buhin} />
            <SubText>参照グリフ</SubText>
            {kageData?.includeGlyphs?.map((glyph) => {
              return <GlyphwikiContent key={glyph.name} name={glyph.name} data={glyph.data} buhin={buhin} />;
            })}
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
};
