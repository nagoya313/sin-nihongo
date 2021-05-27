import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface Props {
  readonly title: string;
  readonly label: string;
  readonly onSearchWordChange: React.Dispatch<string>;
}

const SerchFormTypography = styled(Typography)`
  font-size: 14;
`;

export const SearchForm: React.FC<Props> = ({ title, label, onSearchWordChange }) => {
  const [input, setSearchWord] = useState('');
  const [searchWord] = useDebounce(input, 1000);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  useEffect(() => {
    onSearchWordChange(searchWord);
  }, [searchWord, onSearchWordChange]);

  return (
    <React.Fragment>
      <SerchFormTypography color="textSecondary" gutterBottom>
        {title}
      </SerchFormTypography>
      <TextField label={label} type="search" variant="outlined" onChange={handleChange} />
    </React.Fragment>
  );
};
