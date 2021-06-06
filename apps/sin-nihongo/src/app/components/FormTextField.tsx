import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { TextField, TextFieldProps } from '@material-ui/core';

export const StyledTextField = styled(TextField)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

type Props = {
  name: string;
} & TextFieldProps;

export const FormTextField: React.FC<Props> = ({ label, name, helperText }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const isError = errors[name] != null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledTextField
          label={label}
          {...field}
          error={isError}
          helperText={isError ? <ErrorMessage errors={errors} name={name} /> : helperText}
        />
      )}
    />
  );
};
