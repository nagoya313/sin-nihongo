import React from 'react';
import { ListItemIcon as MuiListItemIcon, ListItemIconProps } from '@material-ui/core';

type Props = {
  icon: React.ReactElement;
} & ListItemIconProps;

export const ListItemIcon: React.FC<Props> = ({ icon }) => <MuiListItemIcon>{icon}</MuiListItemIcon>;
