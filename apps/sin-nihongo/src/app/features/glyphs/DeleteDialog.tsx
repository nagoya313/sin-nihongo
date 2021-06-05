import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTheme } from '@material-ui/core/styles';
import { useLazyAxiosDelete } from '../../libs/axios';
import { Message } from '@sin-nihongo/api-interfaces';
import { NoticeDispatchContext } from '../notice/Notice';

const StyledDiv = withTheme(styled.div`
  width: 100%;
  & > * + * {
    margin-top: ${(props) => props.theme.spacing(2)}px;
  }
`);

interface Props {
  readonly id: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

export const DeleteDialog: React.FC<Props> = ({ id, open, onClose }) => {
  const noticeDispatch = useContext(NoticeDispatchContext);
  const [{ error }, refetch] = useLazyAxiosDelete<Message>('');

  const onDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refetch({ url: `api/v1/glyphs/${id}` }).catch(() => {});
    onClose();
  };

  useEffect(() => {
    if (error) {
      noticeDispatch({ type: 'open', message: error.message });
    }
  }, [error, noticeDispatch]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>グリフお本当に削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              いーえ
            </Button>
            <Button onClick={onDelete} color="primary" autoFocus>
              はい
            </Button>
          </DialogActions>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
