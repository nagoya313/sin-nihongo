import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useFormContext, type FormProps, type Validator } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import { SEARCH_WAIT } from '~/components/constants';

const EMPTY_DATA = {};

type UseSearchProps<TParamsType, TData> = {
  formId: string;
  validator: Validator<TParamsType>;
  initialData: TData;
  action?: string;
};

export const useSearch = <TParamsType, TData>({
  formId,
  validator,
  initialData,
  action,
}: UseSearchProps<TParamsType, TData>) => {
  const fetcher = useFetcher<TData>();
  const { getValues, validate } = useFormContext(formId);
  const submit = () => fetcher.submit(getValues(), { action });
  const onChange = useDebouncedCallback(async () => {
    const result = await validate();
    if (!result.error) {
      submit();
    }
  }, SEARCH_WAIT);
  const onSubmit: FormProps<TParamsType>['onSubmit'] = (_, { preventDefault }) => {
    submit();
    preventDefault();
  };
  const [data, setData] = useState<TData | {}>(EMPTY_DATA);

  useEffect(() => {
    if (fetcher.type === 'done') {
      setData(fetcher.data);
    } else if (fetcher.state === 'submitting') {
      setData(EMPTY_DATA);
    }
  }, [fetcher]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return { formProps: { id: formId, fetcher, onChange, onSubmit, validator, action }, data };
};

type InfinityData<TKey extends string> = {
  [key in TKey]: ReadonlyArray<any>;
} & { offset: number };

type UseInfinitySearchProps<TParamsType, TKey extends string, TData extends InfinityData<TKey>> = {
  key: TKey;
  readLimit: number;
} & UseSearchProps<TParamsType, TData>;

const hasInfinityData = <TData>(data: any, key: string): data is TData => key in data && 'offset' in data;

export const useInfinitySearch = <TParamsType, TKey extends string, TData extends InfinityData<TKey>>({
  key,
  readLimit,
  ...searchProps
}: UseInfinitySearchProps<TParamsType, TKey, TData>) => {
  const props = useSearch(searchProps);
  const { getValues } = useFormContext(searchProps.formId);
  const [data, setData] = useState<TData[TKey]>([] as unknown as TData[TKey]);

  const moreLoad = () => {
    if (hasInfinityData<TData>(props.data, key) && props.data[key].length === readLimit) {
      const formData = getValues();
      formData.set('offset', (props.data.offset + 20).toString());
      props.formProps.fetcher.submit(formData);
    }
  };

  useEffect(() => {
    if (hasInfinityData<TData>(props.data, key)) {
      if (props.data.offset) {
        setData((prev) =>
          hasInfinityData<TData>(props.data, key) ? (prev.concat(props.data[key]) as unknown as TData[TKey]) : prev,
        );
      } else {
        setData(props.data[key]);
      }
    }
  }, [props.data, key]);

  return { ...props, moreLoad, data, offset: 'offset' in props.data ? props.data.offset : 0 };
};
