import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export const Login: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <IconButton>
        <Avatar alt={user?.nickname} src={user?.picture} />
      </IconButton>
    );
  }
  return (
    <Button color="inherit" onClick={() => loginWithRedirect()}>
      ログイン
    </Button>
  );
};
