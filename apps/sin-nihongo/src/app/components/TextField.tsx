import React from 'react';
import styled from 'styled-components';
import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';

const StyledTextField = styled(MuiTextField)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextField: React.VFC<TextFieldProps> = (props) => <StyledTextField {...props} />;

export const SearchTextField: React.VFC<TextFieldProps> = (props) => <StyledTextField {...props} type="search" />;
