import React, { Suspense } from 'react';
import { GetGlyphwikiParams } from '@sin-nihongo/sin-nihongo-params';
import { Divider } from '../../components/Divider';
import { SearchForm } from '../../components/Form';
import { SearchFormTextField } from '../../components/TextField';
import { useSearchForm } from '../../utils/useSearchForm';
import { SearchResult } from './SearchResult';

export const Search: React.VFC = () => {
  console.log('グリフウィキ検索');
  const { params, control } = useSearchForm(GetGlyphwikiParams);

  return (
    <>
      <SearchForm>
        <SearchFormTextField
          control={control}
          name="q"
          label="漢字・USC・グリフ名"
          helperText="例：一、u4e00、aj1-10186"
        />
      </SearchForm>
      <Divider />
      {control.isValid && params && (
        <Suspense fallback={<span>検索中</span>}>
          <SearchResult params={params} />
        </Suspense>
      )}
    </>
  );
};
