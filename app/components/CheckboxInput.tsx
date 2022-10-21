import { Checkbox } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type CheckboxInputProps = {
  name: string;
  label: string;
};

const CheckboxInput = ({ name, label }: CheckboxInputProps) => {
  const { getInputProps, defaultValue } = useField(name);

  return (
    <Checkbox defaultChecked={defaultValue} {...getInputProps()}>
      {label}
    </Checkbox>
  );
};

export default CheckboxInput;
