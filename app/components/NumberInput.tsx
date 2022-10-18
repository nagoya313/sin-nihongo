import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as CUINumberInput,
  NumberInputField,
  NumberInputStepper,
  type NumberInputProps as CUINumberInputProps,
} from '@chakra-ui/react';
import { useControlField, useField, useFormContext } from 'remix-validated-form';

type NumberInputProps = {
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
};

const NumberInput = ({ name, placeholder, ...inputProps }: NumberInputProps) => {
  const { getInputProps } = useField(name);
  const [value, setValue] = useControlField<string>(name);
  const { submit } = useFormContext();
  const handleChange = (value: string) => {
    setValue(value);
    submit();
  };

  return (
    <CUINumberInput
      value={value ?? ''}
      {...getInputProps<CUINumberInputProps>({ ...inputProps, onChange: handleChange })}
    >
      <NumberInputField placeholder={placeholder} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </CUINumberInput>
  );
};

export default NumberInput;
