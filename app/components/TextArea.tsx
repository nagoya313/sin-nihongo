import { Textarea, type TextareaProps } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';

type TextAreaProps = {
  name: string;
};

const TextArea = ({ name }: TextAreaProps) => {
  const { getInputProps } = useField(name);

  return <Textarea {...getInputProps<TextareaProps>({ id: name })} />;
};

export default TextArea;
