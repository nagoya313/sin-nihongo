import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { withTheme } from '@material-ui/core/styles';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER, KageRecursionData } from '@sin-nihongo/api-interfaces';
import { NewTabLink } from '../../components/NewTabLink';
import { SearchForm } from '../../components/SearchForm';
import { GlyphwikiData } from './GlyphwikiData';

const CardAvatar = styled(Avatar)`
  background-color: ${red[500]};
`;

const CanvasBox = withTheme(styled(Box)`
  margin: ${(props) => props.theme.spacing(1)}px;
  position: relative;
  width: 200px;
  height: 200px;
`);

const Canvas = styled.canvas`
  border: 1px solid gray;
  background-color: white;
`;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const validation = (word: string) => word.match(GLYPHWIKI_QUERY_PARAMS_MATCHER) !== null || word === '';

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
      <div>
        <GridList cellHeight={180}>
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
            <CanvasBox>
              <Canvas ref={canvasRef} width="200px" height="200px" />
            </CanvasBox>
            <GridListTileBar
              title={kageData?.name}
              subtitle={splitData(kageData?.needGlyphs[0]?.data)}
            ></GridListTileBar>
          </GridListTile>
          {searchWord !== '' && <GlyphwikiData searchWord={searchWord} onLoad={setKageData} />}
          {kageData?.needGlyphs.slice(1).map((glyph) => {
            return (
              <GridListTile key={glyph.name}>
                <GridListTileBar
                  title={glyph.name}
                  subtitle={splitData(glyph.data)}
                  style={{ height: 'auto' }}
                ></GridListTileBar>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    </React.Fragment>
  );
};
