import { Input } from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import { Select } from 'chakra-react-select';
import { useEffect, useState } from 'react';
import { $path } from 'remix-routes';
import { ClientOnly } from 'remix-utils';
import { useControlField, useField, useFormContext } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import FormControl from '~/components/FormControl';
import { radicalQueryParams } from '~/features/radicals/validators';
import { type loader } from '~/routes/radicals/index';
import { type LoaderData } from '~/utils/types';

type SelectProps = React.ComponentProps<typeof Select>;

const RadicalSelectInput = () => {
  const { getInputProps } = useField('radical');
  const [value, setValue] = useControlField<string>('radical');
  const { submit } = useFormContext();
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const fetcher = useFetcher<LoaderData<typeof loader>>();
  const handleChange = useDebouncedCallback(async (read: string) => {
    if (read) {
      const query = await radicalQueryParams.validate({ read, orderBy: 'code_point' });
      if (!query.error) {
        // indexをつけないとroutes/radicals/indexの方のloaderが起動しない？
        fetcher.submit(query.submittedData, { action: $path('/radicals', { index: '' }) });
      } else {
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  }, 1000);

  useEffect(() => {
    if (fetcher.type === 'done' && 'radicals' in fetcher.data) {
      setOptions([
        ...fetcher.data.radicals.map(({ radical, code_point, reads }) => ({
          label: `${radical}（${reads.join(' ')}）`,
          value: code_point.toString(),
        })),
      ]);
    }
  }, [fetcher]);

  return (
    <FormControl name="radical" label="部首" help="部首名お指定して検索できます。">
      <ClientOnly fallback={<Input />}>
        {() => (
          <Select
            // 選擇ずみではinput valueとして""、クリアではundefinedがくる
            // Selectのvalueに""を渡せばinputクリア、undefinedを渡してもクリアされない
            // といふ擧動を利用（いいのか？）
            value={value == null ? '' : undefined}
            {...getInputProps<SelectProps>({
              isLoading: fetcher.state === 'submitting',
              options,
              onInputChange: (value) => {
                setValue(value);
                handleChange(value);
              },
              onChange: () => submit(),
              isClearable: true,
              backspaceRemovesValue: true,
              placeholder: 'いち、しょー、つずみ',
              menuPortalTarget: typeof document !== 'undefined' ? document.body : undefined,
              styles: { menuPortal: (base) => ({ ...base, zIndex: 100 }) },
            })}
          />
        )}
      </ClientOnly>
    </FormControl>
  );
};

export default RadicalSelectInput;
