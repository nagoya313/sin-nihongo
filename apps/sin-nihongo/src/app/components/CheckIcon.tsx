import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';

interface Props {
  readonly val: boolean;
}

export const CheckIcon: React.FC<Props> = ({ val }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {val && (
      <IconButton>
        <Check />
      </IconButton>
    )}
  </>
);
