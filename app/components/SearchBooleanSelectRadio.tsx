import FormControl from './FormControl';
import SearchRadioGroup from './SearchRadioGroup';

type BooleanSelectRadioProps = {
  name: string;
  label: string;
  labels: ReadonlyArray<{ key: 'none' | 'true' | 'false'; label: string }>;
};

const SearchBooleanSelectRadio = ({ name, label, labels }: BooleanSelectRadioProps) => (
  <FormControl as="fieldset" name={name} label={label}>
    <SearchRadioGroup name={name} radioLabels={labels} />
  </FormControl>
);

export default SearchBooleanSelectRadio;
