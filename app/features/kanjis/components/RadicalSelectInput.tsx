import { $path } from 'remix-routes';
import AsyncSelectInput from '~/components/AsyncSelectInput';
import { radicalQueryParams } from '~/features/radicals/validators';
import { type loader } from '~/routes/radicals/index';
import { type LoaderData, type UnionSelect } from '~/utils/types';

type RadicalSelectInputProps = {
  onChange?: () => void;
  defaultOption?: UnionSelect<LoaderData<typeof loader>, 'radicals'>['radicals'][number];
};

const RadicalSelectInput = ({ onChange, defaultOption }: RadicalSelectInputProps) => (
  <AsyncSelectInput
    name="radical"
    label="部首"
    help="部首名お指定して検索できます。"
    placeholder="いち、しょー、つずみ"
    action={$path('/radicals', { index: '' })}
    validator={radicalQueryParams}
    onChange={onChange}
    defaultOption={defaultOption}
    toQueryParams={(read) => ({ read, order_by: 'code_point' })}
    toOptions={(data: LoaderData<typeof loader>) => ('radicals' in data ? data.radicals : [])}
    getOptionLabel={({ reads }) => reads.join(' ')}
    getOptionValue={({ code_point }) => code_point.toString()}
    formatOptionLabel={({ radical }) => radical}
  />
);

export default RadicalSelectInput;
