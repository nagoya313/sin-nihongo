import SearchRadioInput from '~/components/SearchRadioInput';

const LABELS = Object.freeze([
  { value: 'none', label: '指定なし' },
  { value: 'true', label: '常用' },
  { value: 'false', label: '常用外' },
] as const);

const RegularSelectRadio = () => <SearchRadioInput name="regular" label="常用漢字" options={LABELS} />;

export default RegularSelectRadio;
