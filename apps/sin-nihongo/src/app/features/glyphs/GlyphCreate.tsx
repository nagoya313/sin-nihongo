import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { CardAvatar } from '../../components/CardAvatar';

export const GlyphCreate = () => {
  return (
    <Card>
      <CardHeader
        avatar={<CardAvatar>グ</CardAvatar>}
        title="グリフ新規作成"
        titleTypographyProps={{ variant: 'h4' }}
      />
      <CardContent></CardContent>
    </Card>
  );
};
