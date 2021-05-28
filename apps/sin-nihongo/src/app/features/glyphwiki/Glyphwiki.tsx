import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Buhin } from '@kurgm/kage-engine';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER, KageRecursionData } from '@sin-nihongo/api-interfaces';
import { NewTabLink } from '../../components/NewTabLink';
import { SearchForm } from '../../components/SearchForm';
import { GlyphwikiData } from './GlyphwikiData';
import { GlyphwikiContent } from './GlyphwikiContent';

const CardAvatar = styled(Avatar)`
  background-color: ${red[500]};
`;

export const Glyphwiki = () => {
  const [searchWord, setSearchWord] = useState('');
  const [kageData, setKageData] = useState<KageRecursionData>();
  const [buhin, setBuhin] = useState(new Buhin());
  const validation = (word: string) => word.match(GLYPHWIKI_QUERY_PARAMS_MATCHER) !== null || word === '';

  useEffect(() => {
    const b = new Buhin();
    kageData?.needGlyphs?.forEach((glyph) => {
      b.push(glyph.name, glyph.data);
    });
    setBuhin(b);
  }, [kageData]);

  return (
    <Card>
      <CardHeader
        avatar={<CardAvatar>字</CardAvatar>}
        title="グリフウィキ検索"
        titleTypographyProps={{ variant: 'h4' }}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          <NewTabLink
            url="https://glyphwiki.org/wiki/GlyphWiki:%e3%83%a1%e3%82%a4%e3%83%b3%e3%83%9a%e3%83%bc%e3%82%b8"
            text="グリフウィキ"
          />
          からグリフお検索します。漢字一文字或いわグリフウィキのグリフ名から検索できます。
        </Typography>
        <SearchForm
          label="漢字・USC・グリフ名"
          onSearchWordChange={setSearchWord}
          validation={validation}
          hint="例：一、u4e00、aj1-10186'"
          errorMessage="検索ワードが不正です"
        />
        <Divider />
        {searchWord !== '' && <GlyphwikiData searchWord={searchWord} onLoad={setKageData} />}
        {kageData?.name && (
          <React.Fragment>
            <GlyphwikiContent name={kageData?.name} data={kageData?.needGlyphs[0]?.data} buhin={buhin} />
            <Typography variant="body2" gutterBottom>
              参照グリフ
            </Typography>
            {kageData?.needGlyphs.slice(1).map((glyph) => {
              return <GlyphwikiContent key={glyph.name} name={glyph.name} data={glyph.data} buhin={buhin} />;
            })}
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
};
