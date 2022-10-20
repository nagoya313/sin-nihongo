import FormControl from '~/components/FormControl';
import SearchRadioGroup from '~/components/SearchRadioGroup';

const LABELS = Object.freeze([
  { key: 'none', label: '指定なし' },
  { key: '1', label: '第一水準' },
  { key: '2', label: '第二水準' },
] as const);

const JisLevelSelectRadio = () => (
  <FormControl as="fieldset" name="jisLevel" label="JIS水準">
    <SearchRadioGroup name="jisLevel" radioLabels={LABELS} />
  </FormControl>
);

export default JisLevelSelectRadio;
