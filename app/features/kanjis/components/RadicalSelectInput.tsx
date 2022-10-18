import { useFetcher, useLoaderData } from '@remix-run/react';
import { Select } from 'chakra-react-select';
import { useEffect, useState } from 'react';
import { useField, useFormContext } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import FormControl from '~/components/FormControl';
import { radicalQueryParams } from '~/features/radicals/validators/params';
import { type loader } from '~/routes/radicals';

type SelectProps = React.ComponentProps<typeof Select>;

const RadicalSelectInput = () => {
  const { getInputProps } = useField('radical');
  const { submit } = useFormContext();
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const fetcher = useFetcher<ReturnType<typeof useLoaderData<typeof loader>>>();
  const handleChange = useDebouncedCallback(async (value: string) => {
    if (value) {
      const query = await radicalQueryParams.validate({ read: value, orderBy: 'code_point' });
      if (!query.error) {
        fetcher.submit(query.submittedData, { action: '/radicals?index' });
      }
    } else {
      setOptions([]);
    }
  }, 1000);

  useEffect(() => {
    if (fetcher.type === 'done' && 'radicals' in fetcher.data) {
      console.log(fetcher.data);
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
      <Select
        {...getInputProps<SelectProps>({
          isLoading: fetcher.state === 'submitting',
          options,
          onInputChange: (value) => {
            handleChange(value);
          },
          onChange: () => submit(),
          isClearable: true,
          backspaceRemovesValue: true,
          placeholder: 'いち、しょー、つずみ',
        })}
      />
    </FormControl>
  );
};

export default RadicalSelectInput;
