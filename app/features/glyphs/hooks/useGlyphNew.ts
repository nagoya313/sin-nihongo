import { useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { $path } from 'remix-routes';
import { GLYPHWIKI_SEARCH_FORM_ID } from '~/features/glyphs/constants';
import { glyphwikiQueryParams } from '~/features/glyphwiki/validators';
import { useSearch } from '~/hooks/useSearch';
import { type action } from '~/routes/glyphs/new';
import { type loader as glyphPreviewLoader } from '~/routes/glyphs/preview';
import { type loader as glyphwikiLoader } from '~/routes/glyphwiki';
import { type LoaderData } from '~/utils/types';

const INITIAL_DATA = {} as LoaderData<typeof glyphwikiLoader>;

const useGlyphNew = () => {
  const { data, formProps } = useSearch({
    formId: GLYPHWIKI_SEARCH_FORM_ID,
    validator: glyphwikiQueryParams,
    initialData: INITIAL_DATA,
    action: $path('/glyphwiki'),
  });
  const actionResult = useActionData<typeof action>();
  const [glyph, setGlyph] = useState<typeof data>(data);
  const [preview, setPreview] = useState<LoaderData<typeof glyphPreviewLoader>>();

  useEffect(() => {
    setGlyph(data);
  }, [data]);

  useEffect(() => {
    if (actionResult != null && 'glyphs' in actionResult) {
      setGlyph(actionResult);
    }
  }, [actionResult]);

  return { formProps, preview, setPreview, glyph };
};

export default useGlyphNew;
