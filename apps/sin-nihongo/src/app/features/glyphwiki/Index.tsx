import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { Description } from './index/Description';
import { Search } from './index/Search';

export const Index: React.VFC = () => (
  <Card>
    <CardHeader avatarText="字" title="グリフウィキ検索" />
    <CardContent>
      <Description />
      <Search />
    </CardContent>
  </Card>
);
