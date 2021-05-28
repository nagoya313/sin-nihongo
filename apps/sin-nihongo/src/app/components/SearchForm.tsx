import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface Props {
  readonly title: string;
  readonly label: string;
  readonly onSearchWordChange: (word: string) => void;
  readonly validation?: (word: string) => boolean;
  readonly hint?: string;
  readonly errorMessage?: string;
}

const SerchFormTypography = styled(Typography)`
  font-size: 14px;
`;

export const SearchForm: React.FC<Props> = ({ title, label, onSearchWordChange, validation, hint, errorMessage }) => {
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
    <React.Fragment>
      <SerchFormTypography color="textSecondary" gutterBottom>
        {title}
      </SerchFormTypography>
      <TextField
        label={label}
        type="search"
        variant="outlined"
        onChange={debounced}
        error={inputError}
        helperText={inputError ? errorMessage : hint}
      />
    </React.Fragment>
  );
};
