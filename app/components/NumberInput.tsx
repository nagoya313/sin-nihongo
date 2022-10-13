import {
  NumberInput as CUINumberInput,
  NumberInputField,
  type NumberInputProps as CUINumberInputProps,
} from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type NumberInputProps = {
  name: string;
  placeholder?: string;
};

const NumberInput = ({ name, placeholder, ...inputProps }: NumberInputProps) => {
  const { getInputProps } = useField(name);

  return (
    <CUINumberInput {...getInputProps<CUINumberInputProps>({ ...inputProps })}>
      <NumberInputField placeholder={placeholder} />
    </CUINumberInput>
  );
};

export default NumberInput;
