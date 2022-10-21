import FormControl from './FormControl';
import SearchNumberInput from './SearchNumberInput';

type SearchStrokeCountInputProps = {
  min: number;
  max: number;
  name?: string;
  label?: string;
};

const SearchStrokeCountSearchInput = ({
  min,
  max,
  name = 'stroke_count',
  label = '画数',
}: SearchStrokeCountInputProps) => (
  <FormControl name={name} label={label}>
    <SearchNumberInput name={name} placeholder={`${min}〜${max}`} min={min} max={max} />
  </FormControl>
);

export default SearchStrokeCountSearchInput;
