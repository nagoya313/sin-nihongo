import FormControl from '~/components/FormControl';
import RadioGroup from '~/components/RadioGroup';

type BooleanSelectRadioProps = {
  name: string;
  label: string;
  labels: ReadonlyArray<{ key: 'none' | 'true' | 'false'; label: string }>;
};

const BooleanSelectRadio = ({ name, label, labels }: BooleanSelectRadioProps) => (
  <FormControl as="fieldset" name={name} label={label}>
    <RadioGroup name={name} radioLabels={labels} />
  </FormControl>
);

export default BooleanSelectRadio;
