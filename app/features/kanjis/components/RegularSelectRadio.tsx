import SearchBooleanSelectRadio from '~/components/SearchBooleanSelectRadio';

const LABELS = Object.freeze([
  { key: 'none', label: '指定なし' },
  { key: 'true', label: '常用' },
  { key: 'false', label: '常用外' },
] as const);

const RegularSelectRadio = () => <SearchBooleanSelectRadio name="regular" label="常用漢字" labels={LABELS} />;

export default RegularSelectRadio;
