import React, { useState } from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextButton } from './TextButton';

type Props = {
  open: boolean;
  title: string;
  onClose?: (yes: boolean) => void;
  yesText?: string;
  noText?: string;
};

export const Dialog: React.FC<Props> = ({ open, title, onClose, yesText, noText }) => {
  const noClose = () => {
    onClose && onClose(false);
  };

  const yesClose = () => {
    onClose && onClose(true);
  };

  return (
    <MuiDialog open={open} onClose={noClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DialogActions>
            <TextButton onClick={noClose} text={noText || 'いーえ'} />
            <TextButton onClick={yesClose} text={yesText || 'はい'} />
          </DialogActions>
        </DialogContentText>
      </DialogContent>
    </MuiDialog>
  );
};
