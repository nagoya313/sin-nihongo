import FormControl from '~/components/FormControl';
import NumberInput from '~/components/NumberInput';

type StrokeCountSearchInputProps = {
  min: number;
  max: number;
  label?: string;
};

const StrokeCountSearchInput = ({ min, max, label = '画数' }: StrokeCountSearchInputProps) => (
  <FormControl name="strokeCount" label={label}>
    <NumberInput name="strokeCount" placeholder={`${min}〜${max}`} min={min} max={max} />
  </FormControl>
);

export default StrokeCountSearchInput;