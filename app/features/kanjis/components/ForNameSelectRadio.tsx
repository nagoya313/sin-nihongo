import BooleanSelectRadio from '~/components/BooleanSelectRadio';

const ForNameSelectRadio = () => (
  <BooleanSelectRadio
    name="forName"
    label="人名用"
    labels={[
      { key: 'none', label: '指定なし' },
      { key: 'true', label: '人名用' },
      { key: 'false', label: '非人名用' },
    ]}
  />
);

export default ForNameSelectRadio;
