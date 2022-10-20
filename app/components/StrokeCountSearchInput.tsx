import FormControl from './FormControl';
import NumberInput from './NumberInput';

type StrokeCountSearchInputProps = {
  min: number;
  max: number;
  name?: string;
  label?: string;
};

const StrokeCountSearchInput = ({ min, max, name = 'strokeCount', label = '画数' }: StrokeCountSearchInputProps) => (
  <FormControl name={name} label={label}>
    <NumberInput name={name} placeholder={`${min}〜${max}`} min={min} max={max} />
  </FormControl>
);

export default StrokeCountSearchInput;
