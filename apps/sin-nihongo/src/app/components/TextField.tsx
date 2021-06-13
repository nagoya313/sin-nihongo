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

export function SearchFormTextField<T extends ParamsPayload<T>>({ control, name, helperText, ...others }: Props<T>) {
  const error = typeof control.errors !== 'undefined' && control.errors[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // IsOptionalが空文字を受付けないため
    control.setValue(name, (e.target.value || undefined) as T[keyof T]);
  };

  return (
    <SearchTextField
      {...others}
      type="search"
      helperText={error ? error : helperText}
      error={!!error}
      onChange={handleChange}
    />
  );
}

export function SearchFormNumberField<T extends ParamsPayload<T>>({ control, name, helperText, ...others }: Props<T>) {
  const error = typeof control.errors !== 'undefined' && control.errors[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    console.log(value);
    // IsOptionalがNaNを受付けないため
    control.setValue(name, (isNaN(value) ? undefined : value) as T[keyof T]);
  };

  return (
    <MuiTextField
      {...others}
      type="number"
      helperText={error ? error : helperText}
      error={!!error}
      onChange={handleChange}
    />
  );
}
