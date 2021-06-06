import React from 'react';
import { CardHeader as MuiCardHeader } from '@material-ui/core';
import { CardAvatar } from './CardAvatar';

type Props = {
  avatarText: string;
  title: string;
};

export const CardHeader: React.FC<Props> = ({ avatarText, title }) => {
  return (
    <MuiCardHeader
      avatar={<CardAvatar>{avatarText}</CardAvatar>}
      title={title}
      titleTypographyProps={{ variant: 'h4' }}
    />
  );
};
