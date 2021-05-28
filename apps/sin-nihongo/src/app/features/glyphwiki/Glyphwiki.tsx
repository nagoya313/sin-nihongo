import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { withTheme } from '@material-ui/core/styles';
import { Buhin } from '@kurgm/kage-engine';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER, KageRecursionData } from '@sin-nihongo/api-interfaces';
import { NewTabLink } from '../../components/NewTabLink';
import { SearchForm } from '../../components/SearchForm';
import { GlyphwikiData } from './GlyphwikiData';
import { GlyphCanvas } from '../../components/GlyphCanvas';

const CardAvatar = styled(Avatar)`
  background-color: ${red[500]};
`;

const GlidListDiv = withTheme(styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  background-color: ${(props) => props.theme.palette.background.paper};
`);

const splitData = (data: string | undefined) => {
  return data?.split('$')?.map((t, i) => {
    return (
      <span key={i}>
        {t}
        <br />
      </span>
    );
  });
};

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
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        グリフウィキ検索
      </Typography>
      <Typography variant="h6" gutterBottom>
        <NewTabLink
          url="https://glyphwiki.org/wiki/GlyphWiki:%e3%83%a1%e3%82%a4%e3%83%b3%e3%83%9a%e3%83%bc%e3%82%b8"
          text="グリフウィキ"
        />
        からグリフお検索します。漢字一文字或いわグリフウィキのグリフ名から検索できます。
      </Typography>
      <GlidListDiv>
        <GridList>
          <GridListTile key="Subheader" style={{ height: 'auto' }}>
            <CardHeader avatar={<CardAvatar>字</CardAvatar>} title="グリフウィキのグリフ" subheader={kageData?.name} />
            <SearchForm
              title="グリフウィキから検索"
              label="漢字・USC"
              onSearchWordChange={setSearchWord}
              validation={validation}
              hint="例：一、u4e00、aj1-10186'"
              errorMessage="検索項目が不正です"
            />
          </GridListTile>
          <GridListTile style={{ height: 'auto' }}>
            <GlyphCanvas buhin={buhin} name={kageData?.name} />
            <GridListTileBar
              title={kageData?.name}
              subtitle={splitData(kageData?.needGlyphs[0]?.data)}
              style={{ height: 'auto' }}
            ></GridListTileBar>
          </GridListTile>
          {searchWord !== '' && <GlyphwikiData searchWord={searchWord} onLoad={setKageData} />}
          <GridListTile cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">参照グリフ</ListSubheader>
          </GridListTile>
          {kageData?.needGlyphs.slice(1).map((glyph) => {
            return (
              <GridListTile key={glyph.name} style={{ height: 'auto' }}>
                <GlyphCanvas buhin={buhin} name={glyph.name} />
                <GridListTileBar
                  title={glyph.name}
                  subtitle={splitData(glyph.data)}
                  style={{ height: 'auto' }}
                ></GridListTileBar>
              </GridListTile>
            );
          })}
        </GridList>
      </GlidListDiv>
    </React.Fragment>
  );
};
