import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as CUINumberInput,
  NumberInputField,
  NumberInputStepper,
  type NumberInputProps as CUINumberInputProps,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type NumberInputProps = {
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
};

const NumberInput = ({ name, placeholder, ...inputProps }: NumberInputProps) => {
  const { getInputProps } = useField(name);

  return (
    <CUINumberInput {...getInputProps<CUINumberInputProps>({ ...inputProps })}>
      <NumberInputField placeholder={placeholder} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </CUINumberInput>
  );
};

export default NumberInput;
