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

export const FormTextField: React.FC<Props> = ({ label, name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledTextField
          label={label}
          {...field}
          error={errors[name] != null}
          helperText={<ErrorMessage errors={errors} name={name} />}
        />
      )}
    />
  );
};
