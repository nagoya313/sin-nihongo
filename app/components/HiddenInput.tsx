import { useField } from 'remix-validated-form';

type HiddenInputProps = {
  name: string;
};

const HiddenInput = ({ name }: HiddenInputProps) => {
  const { getInputProps } = useField(name);

  return <input type="hidden" {...getInputProps({ id: name })} />;
};

export default HiddenInput;
