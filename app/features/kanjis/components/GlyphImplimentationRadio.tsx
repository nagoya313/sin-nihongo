import BooleanSelectRadio from '~/components/BooleanSelectRadio';

const LABELS = Object.freeze([
  { key: 'none', label: '指定なし' },
  { key: 'true', label: '実装済み' },
  { key: 'false', label: '未実装' },
] as const);

const GlyphImplimentationRadio = () => <BooleanSelectRadio name="hasGlyph" label="グリフ実装" labels={LABELS} />;

export default GlyphImplimentationRadio;
