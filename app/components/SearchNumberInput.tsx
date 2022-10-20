import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  type NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useControlField, useField } from 'remix-validated-form';
import { useSearchDebouncedInput } from '~/hooks/useSearch';

type SearchNumberInputProps = {
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
};

const SearchNumberInput = ({ name, placeholder, ...inputProps }: SearchNumberInputProps) => {
  const { getInputProps } = useField(name);
  const [value, setValue] = useControlField<string>(name);
  const submit = useSearchDebouncedInput();
  const handleChange = (value: string) => {
    setValue(value);
    submit();
  };

  return (
    <NumberInput value={value ?? ''} {...getInputProps<NumberInputProps>({ ...inputProps, onChange: handleChange })}>
      <NumberInputField placeholder={placeholder} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default SearchNumberInput;
