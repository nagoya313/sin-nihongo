import { RadioGroup, type RadioGroupProps } from '@chakra-ui/react';
import { useControlField, useField, useFormContext } from 'remix-validated-form';
import FormControl from './FormControl';
import RadioItems from './RadioItems';

type SearchRadioGroupProps = {
  name: string;
  label: string;
  options: ReadonlyArray<{ value: string; label: string }>;
};

const SearchRadioGroup = ({ name, label, options }: SearchRadioGroupProps) => {
  const { getInputProps } = useField(name);
  const [value, setValue] = useControlField<string>(name);
  const { submit } = useFormContext();
  const handleChange = (value: string) => {
    setValue(value);
    submit();
  };

  return (
    <FormControl as="fieldset" name={name} label={label}>
      <RadioGroup
        value={value ?? options[0]!.value}
        {...getInputProps<Omit<RadioGroupProps, 'children'>>({ onChange: handleChange })}
      >
        <RadioItems options={options} />
      </RadioGroup>
    </FormControl>
  );
};

export default SearchRadioGroup;
