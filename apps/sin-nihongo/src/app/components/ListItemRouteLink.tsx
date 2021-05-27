import React, { useMemo, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  readonly icon: any;
  readonly primary: string;
  readonly to: any;
}

export const ListItemRouteLink: React.FC<Props> = ({ icon, primary, to }) => {
  const CustomLink = useMemo(() => forwardRef((linkProps, ref: any) => <Link ref={ref} to={to} {...linkProps} />), [
    to,
  ]);

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};
