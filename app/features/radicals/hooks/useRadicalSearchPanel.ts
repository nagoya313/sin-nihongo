import { useFetcher } from '@remix-run/react';
import { useFormContext } from 'remix-validated-form';
import { useDebouncedCallback } from 'use-debounce';
import { SEARCH_WAIT } from '~/components/constants';
import { RADICAL_SEARCH_FORM_ID } from '../constants';
import { radicalQueryParams } from '../validators/params';

const useRadicalSearchPanel = () => {
  const fetcher = useFetcher();
  const { getValues } = useFormContext(RADICAL_SEARCH_FORM_ID);
  const onChange = useDebouncedCallback(async () => {
    const formData = getValues();
    const result = await radicalQueryParams.validate(formData);
    if (!result.error) {
      fetcher.submit(formData);
    }
  }, SEARCH_WAIT);

  return { id: RADICAL_SEARCH_FORM_ID, fetcher, onChange, validator: radicalQueryParams };
};

export default useRadicalSearchPanel;
