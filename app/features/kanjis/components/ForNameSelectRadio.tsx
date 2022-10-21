import SearchBooleanSelectRadio from '~/components/SearchBooleanSelectRadio';

const LABELS = Object.freeze([
  { key: 'none', label: '指定なし' },
  { key: 'true', label: '人名用' },
  { key: 'false', label: '非人名用' },
] as const);

const ForNameSelectRadio = () => <SearchBooleanSelectRadio name="for_name" label="人名用" labels={LABELS} />;

export default ForNameSelectRadio;
