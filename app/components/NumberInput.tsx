import {
  NumberInput as CUINumberInput,
  NumberInputField,
  type NumberInputProps as CUINumberInputProps,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type NumberInputProps = {
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
};

// NumberInputStepper で onChange が發火しない模樣
const NumberInput = ({ name, placeholder, ...inputProps }: NumberInputProps) => {
  const { getInputProps } = useField(name);

  return (
    <CUINumberInput {...getInputProps<CUINumberInputProps>({ ...inputProps })}>
      <NumberInputField placeholder={placeholder} />
    </CUINumberInput>
  );
};

export default NumberInput;
