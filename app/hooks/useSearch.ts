import { useFetcher, useLoaderData } from '@remix-run/react';
import { FormProps, useFormContext, type Validator } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import { SEARCH_WAIT } from '~/components/constants';

const useSearch = <TParamsType>(formId: string, validator: Validator<TParamsType>) => {
  const fetcher = useFetcher();
  const { getValues, validate } = useFormContext(formId);
  const submit = () => fetcher.submit(getValues());
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
  const initialData = useLoaderData();
  const data = fetcher.type === 'done' ? fetcher.data : initialData;
  const isError = 'fieldErrors' in data;

  return { id: formId, fetcher, onChange, onSubmit, validator, data: isError ? [] : data };
};

export default useSearch;
