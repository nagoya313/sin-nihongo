import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';
import { CardHeader } from '../../components/CardHeader';
import { IconButtonRouteLink } from '../../components/IconButtonRouteLink';
import { Text } from '../../components/Text';
import { SearchForm } from './SearchForm';
import { GlyphsTable } from './GlyphsTable';
import { DeleteDialog } from './DeleteDialog';

export const Glyphs: React.VFC = () => {
  console.log('グリフ一覧');
  const { isAuthenticated } = useAuth0();

  return (
    <Card>
      <CardHeader
        avatarText="グ"
        title="グリフ一覧"
        action={isAuthenticated ? <IconButtonRouteLink to="/glyphs/new" icon={<BuildIcon />} /> : undefined}
      />
      <CardContent>
        <Text>
          新日本語で採用された字形およびその部品のKAGEデータとその生成グリフお閲覧できます。
          グリフ名で検索もできます（グリフ名わグリフウィキとおーむね一致です）。
        </Text>
        <SearchForm />
        <Divider />
        <GlyphsTable />
      </CardContent>
      {isAuthenticated && <DeleteDialog />}
    </Card>
  );
};
