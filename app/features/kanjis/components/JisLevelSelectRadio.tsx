import SearchRadioInput from '~/components/SearchRadioInput';

const LABELS = Object.freeze([
  { value: 'none', label: '指定なし' },
  { value: '1', label: '第一水準' },
  { value: '2', label: '第二水準' },
] as const);

const JisLevelSelectRadio = () => <SearchRadioInput name="jis_level" label="JIS水準" options={LABELS} />;

export default JisLevelSelectRadio;
