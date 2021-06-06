import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, withTheme, ThemeProvider } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import { AppBar, HeaderDiv } from './features/app/AppBar';
import { SideBar } from './features/app/SideBar';
import { Router } from './features/app/Router';
import { Notice, NoticeProvider } from './features/notice/Notice';

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
        <Box display="flex">
          <CssBaseline />
          <BrowserRouter>
            <AppBar />
            <SideBar />
            <ContentMain>
              <HeaderDiv />
              <Router />
            </ContentMain>
          </BrowserRouter>
        </Box>
        <Notice />
      </NoticeProvider>
    </ThemeProvider>
  );
};

export default App;
