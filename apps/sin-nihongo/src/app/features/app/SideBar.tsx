import React from 'react';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CategorIcon from '@material-ui/icons/Category';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import SearchIcon from '@material-ui/icons/Search';
import TranslateIcon from '@material-ui/icons/Translate';
import { HeaderDiv } from '../../components/AppBar';
import { ListItemRouteLink } from '../../components/ListItemRouteLink';

const MenuDiv = styled.div`
  overflow: auto;
`;

const StyledDrawer = styled(Drawer)`
  width: 240px;
  flex-shrink: 0;
  .MuiDrawer-paper {
    width: 240px;
  }
`;

export const SideBar: React.FC = () => {
  return (
    <StyledDrawer variant="permanent">
      <HeaderDiv />
      <MenuDiv>
        <List>
          <ListItemRouteLink icon={<SearchIcon />} primary="グリフウィキ検索" to="/glyphwiki" />
          <ListItemRouteLink icon={<CategorIcon />} primary="部首索引" to="/radicals" />
          <ListItemRouteLink icon={<TranslateIcon />} primary="新日本語漢字" to="/kanjis" />
          <ListItemRouteLink icon={<FormatSizeIcon />} primary="グリフ一覧" to="/glyphs" />
        </List>
      </MenuDiv>
    </StyledDrawer>
  );
};
