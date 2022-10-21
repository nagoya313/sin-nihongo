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
import { type LoaderData, type UnionSelect } from '~/utils/types';

const RadicalSelectInput = () => {
  const { getInputProps } = useField('radical');
  const { submit } = useFormContext();
  const fetcher = useFetcher<LoaderData<typeof loader>>();
  const [options, setOptions] = useState<UnionSelect<typeof fetcher['data'], 'radicals'>['radicals']>([]);
  const [value, setValue] = useControlField<typeof options[number] | null>('radical');
  const handleChange = useDebouncedCallback(async (read: string) => {
    if (read) {
      const query = await radicalQueryParams.validate({ read, order_by: 'code_point' });
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
      setOptions(fetcher.data.radicals);
    }
  }, [fetcher]);

  return (
    <FormControl name="radical" label="部首" help="部首名お指定して検索できます。">
      <ClientOnly fallback={<Input />}>
        {() => (
          <Select
            // remix-validated-formでクリアすると undefined が value にくる
            // react-selectのクリアには null を入れるので變換する
            value={value ?? null}
            {...getInputProps<React.ComponentProps<typeof Select<typeof options[number]>>>({
              isLoading: fetcher.state === 'submitting',
              options,
              getOptionLabel: ({ reads }) => reads.join(' '),
              getOptionValue: ({ code_point }) => code_point.toString(),
              formatOptionLabel: ({ radical }) => radical,
              onInputChange: (value) => {
                handleChange(value);
              },
              onChange: (value) => {
                setValue(value);
                submit();
              },
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
