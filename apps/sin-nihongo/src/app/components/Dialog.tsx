import React from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextButton } from './Button';

type Props = {
  open: boolean;
  title: string;
  onClose?: (yes: boolean) => void;
  yesText?: string;
  noText?: string;
};

export const Dialog: React.FC<Props> = ({ open, title, onClose, yesText, noText }) => {
  const handleClose = (yes: boolean) => () => {
    onClose && onClose(yes);
  };

  return (
    <MuiDialog open={open} onClose={handleClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DialogActions>
            <TextButton onClick={handleClose(false)} text={noText || 'いーえ'} />
            <TextButton onClick={handleClose(true)} text={yesText || 'はい'} />
          </DialogActions>
        </DialogContentText>
      </DialogContent>
    </MuiDialog>
  );
};
