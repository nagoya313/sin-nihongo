import React from 'react';
import { HeaderDiv } from '../../components/AppBar';
import { Drawer } from '../../components/Drawer';
import { CategoryIcon, FormatSizeIcon, SearchIcon, TranslateIcon } from '../../components/Icons';
import { List, ListItemRouteLink } from '../../components/List';

export const SideBar: React.FC = () => {
  return (
    <Drawer>
      <HeaderDiv />
      <div style={{ overflow: 'auto' }}>
        <List>
          <ListItemRouteLink icon={<SearchIcon />} primary="グリフウィキ検索" to="/glyphwiki" />
          <ListItemRouteLink icon={<CategoryIcon />} primary="部首索引" to="/radicals" />
          <ListItemRouteLink icon={<TranslateIcon />} primary="新日本語漢字" to="/kanjis" />
          <ListItemRouteLink icon={<FormatSizeIcon />} primary="グリフ一覧" to="/glyphs" />
        </List>
      </div>
    </Drawer>
  );
};
