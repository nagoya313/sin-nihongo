import React, { Suspense } from 'react';
import { useQuery } from 'react-fetching-library';
import { GetGlyphwikiParams } from '@sin-nihongo/sin-nihongo-params';
import { Divider } from '../../components/Divider';
import { SearchForm } from '../../components/Form';
import { SearchTextField } from '../../components/TextField';
import { ErrorTypography } from '../../components/Typography';
import { useApiQuery } from '../../apiClient';
import { fetchInfos } from '../../routes';
import { useSearchForm } from '../../utils/useSearchForm';
import { SearchResult } from './SearchResult';

export const Search: React.VFC = () => {
  console.log('グリフウィキ検索');
  const { payload, error } = useApiQuery(fetchInfos);
  const {
    params,
    setValue,
    validation: { isValid, errors },
  } = useSearchForm(GetGlyphwikiParams);
  const glyphwikiAccessible = payload?.infos.glyphwikiAccessible;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('q', e.target.value);
  };

  // 空白で赤くなるのが鬱陶しいので
  const isNoError = isValid || !params?.q;

  return (
    <React.Fragment>
      <SearchForm>
        <SearchTextField
          disabled={!glyphwikiAccessible}
          label="漢字・USC・グリフ名"
          helperText={isNoError ? '例：一、u4e00、aj1-10186' : errors?.q}
          error={!isNoError}
          onChange={handleChange}
        />
      </SearchForm>
      <Divider />
      {glyphwikiAccessible
        ? params?.q &&
          isValid && (
            <Suspense fallback={<span>検索中</span>}>
              <SearchResult params={params} />
            </Suspense>
          )
        : error && <ErrorTypography>グリフウィキわ現在利用不能です。</ErrorTypography>}
    </React.Fragment>
  );
};
