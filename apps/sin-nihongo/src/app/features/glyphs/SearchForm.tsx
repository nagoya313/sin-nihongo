import React, { useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { TextField } from '../../components/TextField';
import { useValidation } from '../../utils/useValidation';
import { GetGlyphsParams } from '@sin-nihongo/sin-nihongo-params';

type Props = {
  setSearchWord: (word?: string) => void;
};

export const SearchForm: React.VFC<Props> = ({ setSearchWord }) => {
  const [state, setState] = useState({ nameLike: '' });
  const { isValidating, isValid, errors } = useValidation(GetGlyphsParams, state);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ nameLike: event.target.value });
  };

  useEffect(() => {
    !isValidating && isValid && setSearchWord(state.nameLike || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating, isValid, setSearchWord]);

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
