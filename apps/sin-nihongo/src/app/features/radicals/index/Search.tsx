import React, { Suspense } from 'react';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { FlexBox } from '../../../components/Box';
import { Divider } from '../../../components/Divider';
import { SearchForm } from '../../../components/Form';
import { Table } from '../../../components/Table';
import { SearchFormTextField, SearchFormNumberField } from '../../../components/TextField';
import { Text } from '../../../components/Typography';
import { useSearchForm } from '../../../utils/useSearchForm';
import { columns } from './Columns';
import { SearchResult } from './SearchResult';

export const Search: React.VFC = () => {
  const { params, control } = useSearchForm(GetRadicalsParams);

  return (
    <>
      <FlexBox>
        <SearchForm>
          <SearchFormTextField control={control} name="nameLike" label="なまえ" helperText="例：いち、しょー、つずみ" />
          <SearchFormNumberField control={control} name="numberOfStrokes" label="画数" />
        </SearchForm>
      </FlexBox>
      <Divider />
      {(control.isValid || typeof params === 'undefined') && (
        <Suspense
          fallback={
            <>
              <Text>検索中</Text>
              <Table columns={columns} />
            </>
          }
        >
          <SearchResult params={params} />
        </Suspense>
      )}
    </>
  );
};
