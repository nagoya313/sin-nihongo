import styled from 'styled-components';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { TextField, TextFieldProps } from '@material-ui/core';

export const StyledTextField = styled(TextField)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

type Props<Values> = TextFieldProps & {
  register: UseFormRegister<Values>;
  errors: DeepMap<FieldValues, FieldError>;
  name: Path<Values>;
};

export function FormTextField<Values>({ register, errors, label, name, helperText, type, ...others }: Props<Values>) {
  const isError = errors[name] != null;

  // IsOptionalがnull or undefinedでないとバリデーションスキップが発動しないので空の値にはnullを返す
  // undefinedではフォームのバリデーションをサボる模様
  const { ref, ...rest } = register(
    name,
    type === 'number' ? { setValueAs: (value) => (isNaN(value) ? null : parseInt(value, 10)) } : undefined
  );

  return (
    <StyledTextField
      label={label}
      inputRef={ref}
      type={type}
      {...rest}
      {...others}
      error={isError}
      helperText={isError ? <ErrorMessage errors={errors} name={name} /> : helperText}
    />
  );
}
