import { useLoaderData, useParams } from '@remix-run/react';
import { $params, $path } from 'remix-routes';
import { inRadicalKanjiQueryParams } from '~/features/inRadicalKanjis/validators';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import useMatchesData from '~/hooks/useMatchesData';
import { useSearch } from '~/hooks/useSearch';
import { type loader as radicalLoader } from '~/routes/radicals/$code_point';
import { type loader } from '~/routes/radicals/$code_point/index';

const useRadical = () => {
  const { code_point } = $params('/radicals/:code_point', useParams());
  const radical = useMatchesData<typeof radicalLoader>($path('/radicals/:code_point', { code_point }))!;
  const { data, formProps } = useSearch({
    formId: RADICAL_SEARCH_FORM_ID,
    validator: inRadicalKanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });

  return { radical, kanjis: data, formProps };
};

export default useRadical;
