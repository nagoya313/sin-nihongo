import React from 'react';
import { useControlField } from 'remix-validated-form';
import { useSearchDebouncedInput } from '~/hooks/useSearch';
import NumberInput from './NumberInput';

type SearchNumberInputProps = Omit<React.ComponentProps<typeof NumberInput>, 'value' | 'onChange'>;

const SearchNumberInput = (props: SearchNumberInputProps) => {
  const [value, setValue] = useControlField<string>(props.name);
  const submit = useSearchDebouncedInput();
  const handleChange = (value: string) => {
    setValue(value);
    submit();
  };

  return <NumberInput {...props} value={value ?? ''} onChange={handleChange} />;
};

export default SearchNumberInput;
