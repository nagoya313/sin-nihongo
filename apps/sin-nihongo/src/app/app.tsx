import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Home } from './features/home/Home';

const MenuTitleTypography = styled(Typography)`
  flex-grow: 1;
`;

const MenuIconButton = withTheme(styled(IconButton)`
  margin-right: ${(props) => props.theme.spacing(2)};
`);

const HeaderDiv = withTheme(styled.div`
  ${(props) => ({ ...props.theme.mixins.toolbar })};
`);

export const App = () => {
  return (
    <Box display="flex">
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <MenuIconButton color="inherit" aria-label="open drawer" edge="start">
            <MenuIcon />
          </MenuIconButton>
          <MenuTitleTypography variant="h6">新日本語</MenuTitleTypography>
        </Toolbar>
      </AppBar>
      <main>
        <HeaderDiv />
        <Home />
      </main>
    </Box>
  );
};

export default App;
