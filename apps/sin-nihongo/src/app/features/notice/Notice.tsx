import React, { useContext } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { withTheme } from '@material-ui/core/styles';
import { NoticeStateContext, NoticeDispatchContext } from '../../providers/Notice';

const StyledDiv = withTheme(styled.div`
  width: 100%;
  & > * + * {
    margin-top: ${(props) => props.theme.spacing(2)}px;
  }
`);

export const Notice: React.FC = () => {
  const state = useContext(NoticeStateContext);
  const dispatch = useContext(NoticeDispatchContext);

  return (
    <StyledDiv>
      <Snackbar open={state.open} autoHideDuration={3000} onClose={() => dispatch({ type: 'close' })}>
        <Alert variant="filled" severity={state.severity} onClose={() => dispatch({ type: 'close' })}>
          {state.message}
        </Alert>
      </Snackbar>
    </StyledDiv>
  );
};
