import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, withTheme, ThemeProvider } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import { AppBar, HeaderDiv } from './components/AppBar';
import { FlexBox } from './components/Box';
import { Notice, NoticeProvider } from './components/Notice';
import { SideBar } from './features/app/SideBar';
import { Router } from './features/app/Router';

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
      <NoticeProvider>
        <FlexBox>
          <CssBaseline />
          <BrowserRouter>
            <AppBar title="新日本語" />
            <SideBar />
            <ContentMain>
              <HeaderDiv />
              <Router />
            </ContentMain>
          </BrowserRouter>
        </FlexBox>
        <Notice />
      </NoticeProvider>
    </ThemeProvider>
  );
};

export default App;
