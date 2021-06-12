import React from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import styled from 'styled-components';

const StyledDrawer = styled(MuiDrawer)`
  width: 240px;
  flex-shrink: 0;
  .MuiDrawer-paper {
    width: 240px;
  }
`;

export const Drawer: React.FC = ({ children }) => <StyledDrawer variant="permanent">{children}</StyledDrawer>;
