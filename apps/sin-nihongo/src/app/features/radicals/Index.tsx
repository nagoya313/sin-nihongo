import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { Text } from '../../components/Typography';
import { Search } from './index/Search';

export const Index: React.VFC = () => (
  <Card>
    <CardHeader avatarText="部" title="部首索引" />
    <CardContent>
      <Text>部首名（表音式ひらがなの前方一致）か画数で検索できます。</Text>
      <Search />
    </CardContent>
  </Card>
);
