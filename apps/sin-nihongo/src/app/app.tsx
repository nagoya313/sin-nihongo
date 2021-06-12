import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, HeaderDiv } from './components/AppBar';
import { FlexBox } from './components/Box';
import { Main } from './components/Main';
import { Notice, NoticeProvider } from './components/Notice';
import { ThemeProvider } from './components/Theme';
import { SideBar } from './features/app/SideBar';
import { Router } from './features/app/Router';

export const App: React.FC = () => {
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
              <Router />
            </Main>
          </BrowserRouter>
        </FlexBox>
        <Notice />
      </NoticeProvider>
    </ThemeProvider>
  );
};

export default App;
