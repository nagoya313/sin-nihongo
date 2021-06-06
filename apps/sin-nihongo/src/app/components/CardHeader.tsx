import React, { ReactHTMLElement } from 'react';
import { CardHeader as MuiCardHeader } from '@material-ui/core';
import { CardAvatar } from './CardAvatar';

type Props = {
  avatarText: string;
  title: string;
  action?: React.ReactElement;
};

export const CardHeader: React.FC<Props> = ({ avatarText, title, action }) => {
  return (
    <MuiCardHeader
      avatar={<CardAvatar>{avatarText}</CardAvatar>}
      title={title}
      titleTypographyProps={{ variant: 'h4' }}
      action={action}
    />
  );
};
