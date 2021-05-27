import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER } from '@sin-nihongo/api-interfaces';
import { NewTabLink } from '../../components/NewTabLink';
import { SearchForm } from '../../components/SearchForm';
import { GlyphwikiData } from './GlyphwikiData';

const CardAvatar = styled(Avatar)`
  background-color: ${red[500]};
`;

export const Glyphwiki = () => {
  const [searchWord, setSearchWord] = useState('');
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
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <CardHeader avatar={<CardAvatar>字</CardAvatar>} title="グリフウィキのグリフ" subheader="" />
            <SearchForm
              title="グリフウィキから検索"
              label="漢字・USC"
              onSearchWordChange={setSearchWord}
              validation={validation}
              hint="例：一、u4e00、aj1-10186'"
              errorMessage="検索項目が不正です"
            />
          </GridListTile>
          {searchWord !== '' && <GlyphwikiData searchWord={searchWord} />}
        </GridList>
      </div>
    </React.Fragment>
  );
};
