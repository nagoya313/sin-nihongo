import BooleanSelectRadio from '~/components/BooleanSelectRadio';

const RegularSelectRadio = () => (
  <BooleanSelectRadio
    name="regular"
    label="常用漢字"
    labels={[
      { key: 'none', label: '指定なし' },
      { key: 'true', label: '常用' },
      { key: 'false', label: '常用外' },
    ]}
  />
);

export default RegularSelectRadio;
