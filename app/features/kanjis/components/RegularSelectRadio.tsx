import FormControl from '~/components/FormControl';
import RadioGroup from '~/components/RadioGroup';

export const REGULAR_RADIO = Object.freeze([
  { key: 'none', label: '指定なし' },
  { key: 'true', label: '常用' },
  { key: 'false', label: '常用外' },
] as const);

const RegularSelectRadio = () => (
  <FormControl as="fieldset" name="regular" label="常用漢字">
    <RadioGroup name="regular" radioLabels={REGULAR_RADIO} />
  </FormControl>
);

export default RegularSelectRadio;
