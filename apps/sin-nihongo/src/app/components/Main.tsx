import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

export const Main = withTheme(styled.main`
  flex-grow: 1;
  padding: ${(props) => props.theme.spacing(3)}px;
`);
