import { Input } from '@chakra-ui/react';
import { useFetcher } from '@remix-run/react';
import {
  CreatableSelect,
  type FormatOptionLabelMeta,
  type GetOptionLabel,
  type GetOptionValue,
  Select,
  type SingleValue,
} from 'chakra-react-select';
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
  isCreatable?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  onChange?: (option: SingleValue<TOption>) => void;
  toQueryParams: (value: string) => GenericObject;
  toOptions: (data: TFetcherData) => ReadonlyArray<TOption>;
  getOptionLabel: GetOptionLabel<TOption>;
  getOptionValue: GetOptionValue<TOption>;
  formatOptionLabel: (data: TOption, meta: FormatOptionLabelMeta<TOption>) => React.ReactNode;
  getNewOptionData?: (input: string) => TOption;
  onCreateOption?: (input: string) => void;
} & (
  | {
      isCreatable: true;
      getNewOptionData: (input: string) => TOption;
      onCreateOption: (input: string) => void;
    }
  | {
      isCreatable?: false;
      getNewOptionData?: never;
      onCreateOption?: never;
    }
);

const AsyncSelectInput = <TQueryData, TFetcherData, TOption>({
  name,
  action,
  validator,
  label,
  help,
  placeholder,
  defaultOption,
  isCreatable,
  isReadOnly,
  isRequired,
  onChange,
  toQueryParams,
  toOptions,
  getOptionLabel,
  getOptionValue,
  formatOptionLabel,
  getNewOptionData,
  onCreateOption,
}: AsyncSelectInputProps<TQueryData, TFetcherData, TOption>) => {
  const { getInputProps, validate } = useField(name);
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
  const Component = isCreatable ? CreatableSelect : Select;

  useEffect(() => {
    if (fetcher.type === 'done') {
      setOptions(toOptions(fetcher.data));
    }
  }, [fetcher, toOptions]);

  return (
    <FormControl name={name} label={label} help={help} isRequired={isRequired}>
      <ClientOnly fallback={<Input />}>
        {() => (
          <Component
            // remix-validated-formでクリアすると undefined が value にくる
            // react-selectのクリアには null を入れるので變換する
            value={value ?? defaultOption ?? null}
            //formatCreateLabel={(input) => `${input}で作成`}
            {...getInputProps<React.ComponentProps<typeof Component<typeof options[number]>>>({
              isLoading: fetcher.state === 'submitting',
              allowCreateWhileLoading: true,
              options,
              getOptionLabel,
              getOptionValue,
              formatOptionLabel,
              loadingMessage: () => '検索中',
              noOptionsMessage: () => '該当なし',
              getNewOptionData,
              // うまく動いてない
              formatCreateLabel: (input) => `${input}で作成`,
              isReadOnly,
              onInputChange: (value) => {
                handleChange(value);
              },
              onChange: (value) => {
                setValue(value);
                onChange?.(value);
              },
              onCreateOption: isCreatable
                ? (value) => {
                    setValue(getNewOptionData(value));
                    onCreateOption(value);
                    // 明示的に呼ぶ必要があるパターンが謎
                    validate();
                  }
                : undefined,
              isClearable: !isReadOnly,
              backspaceRemovesValue: !isReadOnly,
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
