import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { CardHeader as MuiCardHeader } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const CardAvatar = styled(Avatar)`
  background-color: ${red[500]};
`;

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
