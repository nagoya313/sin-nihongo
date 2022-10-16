import { useFetcher } from '@remix-run/react';
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
  const data = fetcher.type === 'init' ? initialData : fetcher.type === 'done' ? fetcher.data : EMPTY_DATA;

  return { formProps: { id: formId, fetcher, onChange, onSubmit, validator, action }, data, getValues };
};
