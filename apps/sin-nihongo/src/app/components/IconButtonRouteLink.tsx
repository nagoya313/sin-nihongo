import React from 'react';
import { Link } from 'react-router-dom';
import { Location, LocationDescriptor } from 'history';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

type Props = {
  to: LocationDescriptor<unknown> | ((location: Location<unknown>) => LocationDescriptor<unknown>);
  icon: React.ReactElement;
} & IconButtonProps;

export const IconButtonRouteLink: React.FC<Props> = ({ to, icon }) => {
  return (
    <IconButton component={Link} to={to}>
      {icon}
    </IconButton>
  );
};
