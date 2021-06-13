import react from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

export const Form = withTheme(styled.form`
  & > * {
    margin: ${(props) => props.theme.spacing(1)}px;
  }
`);

export const SearchForm: React.FC = ({ children }) => <Form autoComplete="off">{children}</Form>;
