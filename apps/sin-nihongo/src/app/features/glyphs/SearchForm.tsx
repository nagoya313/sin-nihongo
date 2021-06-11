import React, { useEffect } from 'react';
import { Form } from '../../components/Form';
import { TextField } from '../../components/TextField';
import { useDispatch, useForm } from './GlyphsProvider';
import { useValidation } from '../../utils/useValidation';

export const SearchForm: React.VFC = () => {
  console.log('検索フォーム');
  const dispatch = useDispatch();
  const form = useForm();
  const { isValidating, isValid, errors } = useValidation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SEARCH_WORD_CHANGE', params: { nameLike: event.target.value || undefined } });
  };

  useEffect(() => {
    !isValidating && isValid && dispatch({ type: 'SET_SEARCH_WORD', name: form?.nameLike });
  }, [isValidating, isValid, dispatch, form]);

  return (
    <Form autoComplete="off">
      <TextField
        label="グリフ名"
        type="search"
        helperText={!isValid ? '例：u4e00、aj1-10186' : errors?.nameLike}
        error={!isValid}
        onChange={handleChange}
      />
    </Form>
  );
};
