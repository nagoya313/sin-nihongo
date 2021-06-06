import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

type Props = {
  text: string;
} & ButtonProps;

export const TextButton: React.FC<Props> = ({ text, ...others }) => {
  return (
    <Button color="primary" {...others}>
      {text}
    </Button>
  );
};
