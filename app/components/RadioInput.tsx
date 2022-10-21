import { RadioGroup, type RadioGroupProps } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import RadioItems from './RadioItems';

type RadioInputProps = {
  name: string;
  label: string;
  options: ReadonlyArray<{ value: string; label: string }>;
};

const RadioInput = ({ name, label, options }: RadioInputProps) => {
  const { getInputProps, defaultValue } = useField(name);

  return (
    <FormControl as="fieldset" name={name} label={label}>
      <RadioGroup {...getInputProps<Omit<RadioGroupProps, 'children'>>()} defaultValue={defaultValue.toString()}>
        <RadioItems options={options} />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
