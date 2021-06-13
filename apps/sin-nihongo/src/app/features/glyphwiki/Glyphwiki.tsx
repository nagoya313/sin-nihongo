import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { Text } from '../../components/Typography';
import { NewTabLink } from '../../components/Link';
import { Search } from './Search';

export const Glyphwiki: React.FC = () => {
  console.log('グリフウィキ');

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
        <Search />
      </CardContent>
    </Card>
  );
};
