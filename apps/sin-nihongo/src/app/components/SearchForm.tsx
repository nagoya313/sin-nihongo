import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import TextField from '@material-ui/core/TextField';

interface Props {
  readonly label: string;
  readonly onSearchWordChange: (word: string) => void;
  readonly validation?: (word: string) => boolean;
  readonly hint?: string;
  readonly errorMessage?: string;
}

export const SearchForm: React.FC<Props> = ({ label, onSearchWordChange, validation, hint, errorMessage }) => {
  const [inputError, setInputError] = useState(false);
  const debounced = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof validation === 'undefined' || validation(event.target.value)) {
      setInputError(false);
      onSearchWordChange(event.target.value);
    } else {
      setInputError(true);
    }
  }, 1000);

  return (
    <TextField
      label={label}
      type="search"
      onChange={debounced}
      error={inputError}
      helperText={inputError ? errorMessage : hint}
    />
  );
};
