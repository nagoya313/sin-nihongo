import { Link, useLocation } from 'react-router-dom';
import { Location, LocationDescriptor } from 'history';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon as MuiListItemIcon, ListItemIconProps as MuiListItemIconProps } from '@material-ui/core';

type ListItemIconProps = { icon: React.ReactElement } & MuiListItemIconProps;

export const ListItemIcon: React.FC<ListItemIconProps> = ({ icon }) => <MuiListItemIcon>{icon}</MuiListItemIcon>;

type ListItemLinkProps = {
  href: string;
};

export const ListItemLink: React.FC<ListItemLinkProps> = ({ href, children }) => (
  <ListItem button component="a" href={href} target="_blank" rel="noopener">
    {children}
  </ListItem>
);

type ListItemRouteLinkProps = {
  icon: React.ReactElement;
  primary: string;
  to: LocationDescriptor<unknown> | ((location: Location<unknown>) => LocationDescriptor<unknown>);
};

export const ListItemRouteLink: React.FC<ListItemRouteLinkProps> = ({ icon, primary, to }) => {
  const location = useLocation();

  return (
    <li>
      <ListItem button component={Link} to={to} selected={location.pathname === `${to}`}>
        <ListItemIcon icon={icon} />
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export { List, ListItem, ListItemText };
export { ListItemSecondaryAction } from '@material-ui/core';
