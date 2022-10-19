import { useLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import { KANJI_READ_LIMIT, KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import { kanjiQueryParams } from '~/features/kanjis/validators';
import useActionUpdate from '~/hooks/useActionUpdate';
import { useInfinitySearch } from '~/hooks/useSearch';
import { type action, type loader } from '~/routes/kanjis/index';

const useKanjis = () => {
  const { data, formProps, moreLoad, setData } = useInfinitySearch({
    key: 'kanjis',
    formId: KANJI_SEARCH_FORM_ID,
    validator: kanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
    readLimit: KANJI_READ_LIMIT,
  });

  useActionUpdate<typeof action>(
    useCallback(
      (updated) => {
        if ('kanji' in updated) {
          setData((prev) =>
            prev.map((kanji) => (kanji.code_point === updated.kanji.code_point ? updated.kanji : kanji)),
          );
        }
      },
      [setData],
    ),
  );

  return { data, formProps, moreLoad };
};

export default useKanjis;
