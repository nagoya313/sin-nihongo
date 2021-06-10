import React, { useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { TextField } from '../../components/TextField';
import { useValidation } from '../../utils/useValidation';
import { GetGlyphwikiParams } from '@sin-nihongo/sin-nihongo-params';

type Props = {
  disabled: boolean;
  setSearchWord: (word: string) => void;
};

export const SearchForm: React.VFC<Props> = ({ disabled, setSearchWord }) => {
  const [state, setState] = useState({ q: '' });
  const { isValidating, isValid, errors } = useValidation(GetGlyphwikiParams, state);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ q: event.target.value });
  };

  useEffect(() => {
    !isValidating && isValid && setSearchWord(state.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid, setSearchWord]);

  const isError = !isValid && state.q !== '';

  return (
    <Form autoComplete="off">
      <TextField
        disabled={disabled}
        label="漢字・USC・グリフ名"
        type="search"
        helperText={isError ? errors?.q : '例：一、u4e00、aj1-10186'}
        error={isError}
        onChange={handleChange}
      />
    </Form>
  );
};
