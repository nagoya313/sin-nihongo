import { useLoaderData, useParams } from '@remix-run/react';
import { $params, $path } from 'remix-routes';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import { inRadicalKanjiQueryParams } from '~/features/radicals/validators';
import useMatchesData from '~/hooks/useMatchesData';
import { useSearch } from '~/hooks/useSearch';
import { type loader as radicalLoader } from '~/routes/radicals/$codePoint';
import { type loader } from '~/routes/radicals/$codePoint/index';

const useRadical = () => {
  const { codePoint } = $params('/radicals/:codePoint', useParams());
  const radical = useMatchesData<typeof radicalLoader>($path('/radicals/:codePoint', { codePoint }))!;
  const { data, formProps } = useSearch({
    formId: RADICAL_SEARCH_FORM_ID,
    validator: inRadicalKanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
    action: $path('/radicals/:codePoint', { codePoint }),
  });

  return { radical, kanjis: data, formProps };
};

export default useRadical;
