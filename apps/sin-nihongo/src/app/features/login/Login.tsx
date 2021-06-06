import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '../../components/IconButton';
import { TextButton } from '../../components/TextButton';

export const Login: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  if (isAuthenticated) {
    return <IconButton icon={<Avatar alt={user?.nickname} src={user?.picture} />} />;
  }
  // sampleママ。onClickにloginWithRedirectを直接渡さない理由は謎
  return <TextButton color="inherit" onClick={() => loginWithRedirect()} text="ログイン" />;
};
