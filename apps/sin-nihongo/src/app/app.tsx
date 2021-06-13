import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, HeaderDiv } from './components/AppBar';
import { FlexBox } from './components/Box';
import { Main } from './components/Main';
import { Notice, NoticeProvider } from './components/Notice';
import { ThemeProvider } from './components/Theme';
import { InternalError } from './features/error/500';
import { SideBar } from './features/app/SideBar';
import { Router } from './features/app/Router';

export const App: React.VFC = () => {
  console.log('app');
  return (
    <ThemeProvider>
      <NoticeProvider>
        <FlexBox>
          <CssBaseline />
          <BrowserRouter>
            <AppBar title="新日本語" />
            <SideBar />
            <Main>
              <HeaderDiv />
              <ErrorBoundary FallbackComponent={InternalError}>
                <Router />
              </ErrorBoundary>
            </Main>
          </BrowserRouter>
        </FlexBox>
        <Notice />
      </NoticeProvider>
    </ThemeProvider>
  );
};
