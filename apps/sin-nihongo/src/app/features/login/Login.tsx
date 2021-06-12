import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '../../components/Avatar';
import { IconButton, TextButton } from '../../components/Button';

export const Login: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  if (isAuthenticated) {
    return <IconButton icon={<Avatar alt={user?.nickname} src={user?.picture} />} />;
  }

  const handleClick = () => loginWithRedirect();
  return <TextButton color="inherit" onClick={handleClick} text="ログイン" />;
};
