import SearchRadioInput from '~/components/SearchRadioInput';

const LABELS = Object.freeze([
  { value: 'none', label: '指定なし' },
  { value: 'true', label: '人名用' },
  { value: 'false', label: '非人名用' },
] as const);

const ForNameSelectRadio = () => <SearchRadioInput name="for_name" label="人名用" options={LABELS} />;

export default ForNameSelectRadio;
