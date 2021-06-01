import React, { useMemo, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Location, LocationDescriptor } from 'history';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  readonly icon: React.ReactNode;
  readonly primary: string;
  readonly to: LocationDescriptor<unknown> | ((location: Location<unknown>) => LocationDescriptor<unknown>);
}

export const ListItemRouteLink: React.FC<Props> = ({ icon, primary, to }) => {
  const location = useLocation();

  const CustomLink = useMemo(
    () => forwardRef((linkProps, ref: React.Ref<HTMLAnchorElement>) => <Link ref={ref} to={to} {...linkProps} />),
    [to]
  );

  return (
    <li>
      <ListItem button component={CustomLink} selected={location.pathname === `/${to}`}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};
