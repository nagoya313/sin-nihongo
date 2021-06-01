import React, { useMemo, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Location, LocationDescriptor } from 'history';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  readonly to: LocationDescriptor<unknown> | ((location: Location<unknown>) => LocationDescriptor<unknown>);
}

export const IconButtonRouteLink: React.FC<Props> = ({ to, children }) => {
  const CustomLink = useMemo(
    () => forwardRef((linkProps, ref: React.Ref<HTMLAnchorElement>) => <Link ref={ref} to={to} {...linkProps} />),
    [to]
  );

  return <IconButton component={CustomLink}>{children}</IconButton>;
};
