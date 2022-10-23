import { useLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import { GLYPH_READ_LIMIT, GLYPH_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { glyphsQueryParams } from '~/features/glyphs/validators';
import useActionUpdate from '~/hooks/useActionUpdate';
import { useInfinitySearch } from '~/hooks/useSearch';
import { type action, type loader } from '~/routes/glyphs/index';

const useGlyphs = () => {
  const { data, formProps, moreLoad, setData } = useInfinitySearch({
    key: 'glyphs',
    formId: GLYPH_SEARCH_FORM_ID,
    validator: glyphsQueryParams,
    readLimit: GLYPH_READ_LIMIT,
    initialData: useLoaderData<typeof loader>(),
  });

  useActionUpdate<typeof action>(
    useCallback(
      (updated) => {
        if (updated.name != null) {
          setData((prev) => prev.filter(({ name }) => name != updated.name));
        }
      },
      [setData],
    ),
  );

  return { data, formProps, moreLoad };
};

export default useGlyphs;
