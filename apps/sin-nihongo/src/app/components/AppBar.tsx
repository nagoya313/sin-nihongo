import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar as MuiAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { withTheme } from '@material-ui/core/styles';
import { Button } from './Button';
import { Login } from '../features/login/Login';

const StyledAppBar = withTheme(styled(MuiAppBar)`
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
`);

export const HeaderDiv = withTheme(styled.div`
  ${(props) => ({ ...props.theme.mixins.toolbar })};
`);

type Props = {
  title: string;
};

export const AppBar: React.FC<Props> = ({ title }) => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Button size="large" color="inherit" component={Link} to="/">
          {title}
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Login />
      </Toolbar>
    </StyledAppBar>
  );
};
