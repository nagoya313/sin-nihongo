import styled from 'styled-components';
import { Grid as MuiGrid, GridProps } from '@material-ui/core';

const StyledGrid = styled(MuiGrid)`
  flex-grow: 1;
`;

export const ContainerGrid: React.FC<GridProps> = ({ children, ...others }) => (
  <StyledGrid container {...others} spacing={2}>
    {children}
  </StyledGrid>
);

export const ItemGrid: React.FC<GridProps> = ({ children, ...others }) => (
  <MuiGrid {...others} item>
    {children}
  </MuiGrid>
);
