import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { CardAvatar } from '../../components/CardAvatar';

export const Kanjis = () => {
  return (
    <Card>
      <CardHeader avatar={<CardAvatar>漢</CardAvatar>} title="新日本語漢字" titleTypographyProps={{ variant: 'h4' }} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          JIS第一、第二水準の漢字を検索できます。それ以外の漢字は新日本語ではサポートしません。音読み、訓読みの検索は表音式の前方一致です。
        </Typography>
        <Divider />
      </CardContent>
    </Card>
  );
};
