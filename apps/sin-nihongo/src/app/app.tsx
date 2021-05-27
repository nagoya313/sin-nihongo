import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Home } from './features/home/Home';
import { NotFound } from './features/error/404';
import { ListItemRouteLink } from './components/ListItemRouteLink';
import { Glyphwiki } from './features/glyphwiki/Glyphwiki';

const MenuTitleTypography = styled(Typography)`
  flex-grow: 1;
`;

const MenuDiv = styled.div`
  overflow: 'auto';
`;

const HeaderDiv = withTheme(styled.div`
  ${(props) => ({ ...props.theme.mixins.toolbar })};
`);

const StyledAppBar = withTheme(styled(AppBar)`
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
`);

const StyledDrawer = styled(Drawer)`
  width: 240px;
  flex-shrink: 0;
  .MuiDrawer-paper {
    width: 240px;
  }
`;

const ContentMain = withTheme(styled.main`
  flex-grow: 1;
  padding: ${(props) => props.theme.spacing(3)}px;
`);

export const App = () => {
  return (
    <Box display="flex">
      <CssBaseline />
      <BrowserRouter>
        <StyledAppBar position="fixed">
          <Toolbar>
            <Button size="large" color="inherit" component={Link} to="/">
              新日本語
            </Button>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent">
          <HeaderDiv />
          <MenuDiv>
            <List>
              <ListItemRouteLink icon={<SearchIcon />} primary="グリフウィキ検索" to="glyphwiki" />
            </List>
          </MenuDiv>
        </StyledDrawer>
        <ContentMain>
          <HeaderDiv />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/glyphwiki" component={Glyphwiki} />
            <Route component={NotFound} />
          </Switch>
        </ContentMain>
      </BrowserRouter>
    </Box>
  );
};

export default App;
