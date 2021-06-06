import React from 'react';
import { FormButton } from './FormButton';

type Props = {
  text: string;
};

export const SubmitButton: React.FC<Props> = ({ text }) => (
  <FormButton variant="contained" color="secondary" type="submit">
    {text}
  </FormButton>
);
