import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar as MuiAppBar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { withTheme } from '@material-ui/core/styles';
import { Login } from '../login/Login';

const StyledAppBar = withTheme(styled(MuiAppBar)`
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
`);

export const HeaderDiv = withTheme(styled.div`
  ${(props) => ({ ...props.theme.mixins.toolbar })};
`);

export const AppBar: React.FC = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Button size="large" color="inherit" component={Link} to="/">
          新日本語
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Login />
      </Toolbar>
    </StyledAppBar>
  );
};
