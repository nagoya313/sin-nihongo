import { Link } from 'react-router-dom';
import { Location, LocationDescriptor } from 'history';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@material-ui/core';

type TextButtonProps = { text: string } & ButtonProps;

export const TextButton: React.FC<TextButtonProps> = ({ text, ...others }) => (
  <Button color="primary" {...others}>
    {text}
  </Button>
);

type IconButtonProps = { icon: React.ReactElement } & MuiIconButtonProps;

export const IconButton: React.FC<IconButtonProps> = ({ icon, ...other }) => (
  <MuiIconButton {...other}>{icon}</MuiIconButton>
);

type Props = {
  to: LocationDescriptor<unknown> | ((location: Location<unknown>) => LocationDescriptor<unknown>);
  icon: React.ReactElement;
} & IconButtonProps;

export const IconButtonRouteLink: React.FC<Props> = ({ to, icon }) => (
  <MuiIconButton component={Link} to={to}>
    {icon}
  </MuiIconButton>
);

export { Button } from '@material-ui/core';
