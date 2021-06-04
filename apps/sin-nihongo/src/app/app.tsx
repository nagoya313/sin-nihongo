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
import { createMuiTheme, withTheme, ThemeProvider } from '@material-ui/core/styles';
import CategorIcon from '@material-ui/icons/Category';
import SearchIcon from '@material-ui/icons/Search';
import TranslateIcon from '@material-ui/icons/Translate';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import { Home } from './features/home/Home';
import { NotFound } from './features/error/404';
import { ListItemRouteLink } from './components/ListItemRouteLink';
import { Glyphwiki } from './features/glyphwiki/Glyphwiki';
import { Kanjis } from './features/kanjis/Kanjis';
import { Radicals } from './features/radicals/Radicals';
import { RadicalKanjis } from './features/radicals/RadicalKanjis';

const MenuTitleTypography = styled(Typography)`
  flex-grow: 1;
`;

const MenuDiv = styled.div`
  overflow: auto;
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

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: green,
  },
  props: {
    MuiTextField: {
      variant: 'filled',
    },
  },
});

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
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
                <ListItemRouteLink icon={<SearchIcon />} primary="グリフウィキ検索" to="/glyphwiki" />
                <ListItemRouteLink icon={<CategorIcon />} primary="部首索引" to="/radicals" />
                <ListItemRouteLink icon={<TranslateIcon />} primary="新日本語漢字" to="/kanjis" />
              </List>
            </MenuDiv>
          </StyledDrawer>
          <ContentMain>
            <HeaderDiv />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/glyphwiki" component={Glyphwiki} />
              <Route exact path="/radicals" component={Radicals} />
              <Route exact path="/kanjis" component={Kanjis} />
              <Route exact path="/radicals/:id/kanjis" component={RadicalKanjis} />
              <Route component={NotFound} />
            </Switch>
          </ContentMain>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
