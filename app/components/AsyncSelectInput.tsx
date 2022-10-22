import { Input } from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import { type GetOptionLabel, type GetOptionValue, Select } from 'chakra-react-select';
import { useEffect, useState } from 'react';
import { ClientOnly } from 'remix-utils';
import { useControlField, useField } from 'remix-validated-form';
import { type GenericObject, type Validator } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import FormControl from '~/components/FormControl';

type AsyncSelectInputProps<TQueryData, TFetcherData, TOption> = {
  name: string;
  action: string;
  validator: Validator<TQueryData>;
  label: string;
  help?: string;
  placeholder?: string;
  defaultOption?: TOption;
  onChange?: () => void;
  toQueryParams: (value: string) => GenericObject;
  toOptions: (data: TFetcherData) => ReadonlyArray<TOption>;
  getOptionLabel: GetOptionLabel<TOption>;
  getOptionValue: GetOptionValue<TOption>;
  formatOptionLabel: (data: TOption) => React.ReactNode;
};

const AsyncSelectInput = <TQueryData, TFetcherData, TOption>({
  name,
  action,
  validator,
  label,
  help,
  placeholder,
  defaultOption,
  onChange,
  toQueryParams,
  toOptions,
  getOptionLabel,
  getOptionValue,
  formatOptionLabel,
}: AsyncSelectInputProps<TQueryData, TFetcherData, TOption>) => {
  const { getInputProps } = useField(name);
  const fetcher = useFetcher<TFetcherData>();
  const [options, setOptions] = useState<ReadonlyArray<TOption>>(defaultOption ? [defaultOption] : []);
  const [value, setValue] = useControlField<typeof options[number] | null>(name);
  const handleChange = useDebouncedCallback(async (value: string) => {
    if (value) {
      const query = await validator.validate(toQueryParams(value));
      if (!query.error) {
        fetcher.submit(query.submittedData, { action });
      } else {
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  }, 1000);

  useEffect(() => {
    if (fetcher.type === 'done') {
      setOptions(toOptions(fetcher.data));
    }
  }, [fetcher, toOptions]);

  return (
    <FormControl name={name} label={label} help={help}>
      <ClientOnly fallback={<Input />}>
        {() => (
          <Select
            // remix-validated-formでクリアすると undefined が value にくる
            // react-selectのクリアには null を入れるので變換する
            value={value ?? defaultOption ?? null}
            {...getInputProps<React.ComponentProps<typeof Select<typeof options[number]>>>({
              isLoading: fetcher.state === 'submitting',
              options,
              getOptionLabel,
              getOptionValue,
              formatOptionLabel,
              onInputChange: (value) => {
                handleChange(value);
              },
              onChange: (value) => {
                setValue(value);
                onChange?.();
              },
              isClearable: true,
              backspaceRemovesValue: true,
              placeholder,
              menuPortalTarget: typeof document !== 'undefined' ? document.body : undefined,
              styles: { menuPortal: (base) => ({ ...base, zIndex: 100 }) },
            })}
          />
        )}
      </ClientOnly>
    </FormControl>
  );
};

export default AsyncSelectInput;
