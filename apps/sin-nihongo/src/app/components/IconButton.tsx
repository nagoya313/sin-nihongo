import React from 'react';
import { IconButton as MuiIconButton, SvgIcon, IconButtonProps } from '@material-ui/core';

type Props = {
  icon: React.ReactElement;
} & IconButtonProps;

export const IconButton: React.FC<Props> = ({ icon, ...other }) => <MuiIconButton {...other}>{icon}</MuiIconButton>;
