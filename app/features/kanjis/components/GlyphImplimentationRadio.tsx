import SearchRadioInput from '~/components/SearchRadioInput';

const LABELS = Object.freeze([
  { value: 'none', label: '指定なし' },
  { value: 'true', label: '実装済み' },
  { value: 'false', label: '未実装' },
] as const);

const GlyphImplimentationRadio = () => <SearchRadioInput name="has_glyph" label="グリフ実装" options={LABELS} />;

export default GlyphImplimentationRadio;
