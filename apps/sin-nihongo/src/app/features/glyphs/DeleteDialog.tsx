import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTheme } from '@material-ui/core/styles';
import { useLazyAxiosDelete, accessTokenHeader } from '../../utils/axios';
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
  const { getAccessTokenSilently } = useAuth0();
  const noticeDispatch = useContext(NoticeDispatchContext);
  const [{ error }, refetch] = useLazyAxiosDelete<Message>('');

  const onDelete = async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const token = await getAccessTokenSilently({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      audience: process.env.NX_API_IDENTIFIER!,
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await refetch({ url: `api/v1/glyphs/${id}`, headers: accessTokenHeader(token) }).catch(() => {});
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
