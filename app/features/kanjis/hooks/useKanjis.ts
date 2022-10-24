import { useLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import { KANJI_READ_LIMIT, KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import { kanjiQueryParams } from '~/features/kanjis/validators';
import useActionUpdate from '~/hooks/useActionUpdate';
import { useInfinitySearch } from '~/hooks/useSearch';
import { type action, type loader } from '~/routes/kanjis/index';
import { type UnionSelect } from '~/utils/types';

const useKanjis = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, formProps, moreLoad, setData } = useInfinitySearch({
    key: 'kanjis',
    formId: KANJI_SEARCH_FORM_ID,
    validator: kanjiQueryParams,
    readLimit: KANJI_READ_LIMIT,
    initialData: initialData as UnionSelect<typeof initialData, 'kanjis'>,
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
