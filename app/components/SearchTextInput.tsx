import { Input, type InputProps } from '@chakra-ui/react';
import { useField } from 'remix-validated-form';
import { useSearchDebouncedInput } from '~/hooks/useSearch';

type SearchTextInputProps = {
  name: string;
  placeholder?: string;
  isReadOnly?: boolean;
};

const SearchTextInput = ({ name, ...inputProps }: SearchTextInputProps) => {
  const { getInputProps } = useField(name);
  const onChange = useSearchDebouncedInput();

  return <Input {...getInputProps<InputProps>({ id: name, onChange, ...inputProps })} />;
};

export default SearchTextInput;
