import React from 'react';
import styled from 'styled-components';
import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
import { ParamsPayload, SearchFormControl } from '../utils/useSearchForm';

const StyledTextField = styled(MuiTextField)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextField: React.VFC<TextFieldProps> = (props) => <StyledTextField {...props} />;

export const SearchTextField: React.VFC<TextFieldProps> = (props) => <StyledTextField {...props} type="search" />;

type Props<P> = { name: keyof P; control: SearchFormControl<P> } & Omit<TextFieldProps, 'name'>;

export function SearchFormTextField<T extends ParamsPayload<T>>({ control, name, ...others }: Props<T>) {
  const error = typeof control.errors !== 'undefined' && control.errors[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    control.setValue(name, e.target.value as T[keyof T]);
  };

  return (
    <SearchTextField
      {...others}
      helperText={error ? error : '例：一、u4e00、aj1-10186'}
      error={!!error}
      onChange={handleChange}
    />
  );
}
