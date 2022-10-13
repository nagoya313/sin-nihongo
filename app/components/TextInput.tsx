import { Input, type InputProps } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type TextInputProps = {
  name: string;
  placeholder?: string;
};

const TextInput = ({ name, ...inputProps }: TextInputProps) => {
  const { getInputProps } = useField(name);

  return <Input {...getInputProps<InputProps>({ id: name, ...inputProps })} />;
};

export default TextInput;
