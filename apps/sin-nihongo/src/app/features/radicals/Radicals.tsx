import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '@sin-nihongo/api-interfaces';
import { CardAvatar } from '../../components/CardAvatar';
import { SearchForm } from '../../components/SearchForm';
import { useLazyAxiosGet } from '../../libs/axios';
import { Pagination, Radical } from '@sin-nihongo/api-interfaces';

const validation = (word: string) => word.match(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER) !== null || word === '';

const StyledForm = withTheme(styled.form`
  & > * {
    margin: ${(props) => props.theme.spacing(1)}px;
  }
`);

export const Radicals = () => {
  const [searchName, setSearchName] = useState('');
  const [{ data, loading, error }, refetch] = useLazyAxiosGet<Pagination<Radical>>('api/v1/radicals');

  useEffect(() => {
    if (searchName) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      refetch({ params: { nameLike: searchName } }).catch(() => {});
    }
  }, [refetch, searchName]);

  return (
    <Card>
      <CardHeader avatar={<CardAvatar>部</CardAvatar>} title="部首索引" titleTypographyProps={{ variant: 'h4' }} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          部首名（表音式の前方一致）か画数で検索できます。
        </Typography>
        <StyledForm noValidate autoComplete="off">
          <SearchForm
            label="なまえ"
            onSearchWordChange={setSearchName}
            validation={validation}
            hint="例：いち、しょー、つずみ"
            errorMessage="検索ワードが不正です"
          />
          <TextField
            label="画数"
            type="number"
            InputProps={{
              inputProps: { min: 1 },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </StyledForm>
      </CardContent>
    </Card>
  );
};
