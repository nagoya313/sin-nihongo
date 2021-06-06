import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { InputProps } from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

type Props = {
  label: string;
  inputProps: Partial<InputProps>;
  onSearchNumberChange: (word: string) => void;
};

export const SearchNumberField: React.FC<Props> = ({ label, inputProps, onSearchNumberChange }) => {
  const debounced = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchNumberChange(event.target.value);
  }, 1000);

  return (
    <TextField
      label={label}
      type="number"
      InputProps={inputProps}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={debounced}
    />
  );
};
