import { Textarea, type TextareaProps } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type TextAreaProps = {
  name: string;
  placeholder?: string;
};

const TextArea = ({ name, ...inputProps }: TextAreaProps) => {
  const { getInputProps } = useField(name);

  return <Textarea {...getInputProps<TextareaProps>({ id: name, ...inputProps })} />;
};

export default TextArea;
