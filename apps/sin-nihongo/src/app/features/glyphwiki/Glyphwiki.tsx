import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { NewTabLink } from '../../components/NewTabLink';
import { SearchForm } from '../../components/SearchForm';

const CardAvatar = styled(Avatar)`
  background-color: ${red[500]};
`;

export const Glyphwiki = () => {
  const onSearchWordChange = (word: string) => {
    word && console.log(word);
  };

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
        からグリフお検索します。
      </Typography>
      <div>
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <CardHeader avatar={<CardAvatar>字</CardAvatar>} title="グリフウィキのグリフ" subheader="" />
            <SearchForm title="グリフウィキから検索" label="漢字・USC" onSearchWordChange={onSearchWordChange} />
          </GridListTile>
        </GridList>
      </div>
    </React.Fragment>
  );
};
