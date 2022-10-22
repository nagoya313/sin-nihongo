import {
  NumberInput as CUINumberInput,
  type NumberInputProps as CUINumberInputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type NumberInputProps = {
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
  value?: CUINumberInputProps['value'];
  onChange?: CUINumberInputProps['onChange'];
};

const NumberInput = ({ name, placeholder, value, ...inputProps }: NumberInputProps) => {
  const { getInputProps } = useField(name);

  return (
    <CUINumberInput value={value} {...getInputProps<CUINumberInputProps>({ ...inputProps })}>
      <NumberInputField placeholder={placeholder} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </CUINumberInput>
  );
};

export default NumberInput;
