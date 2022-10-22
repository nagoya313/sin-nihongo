import { useControlField, useFormContext } from 'remix-validated-form';
import RadioInput from './RadioInput';

type SearchRadioGroupProps = Omit<React.ComponentProps<typeof RadioInput>, 'value' | 'onChange'>;

const SearchRadioGroup = (props: SearchRadioGroupProps) => {
  const [value, setValue] = useControlField<string>(props.name);
  const { submit } = useFormContext();
  const handleChange = (value: string) => {
    setValue(value);
    submit();
  };

  return <RadioInput {...props} value={value} onChange={handleChange} />;
};

export default SearchRadioGroup;
