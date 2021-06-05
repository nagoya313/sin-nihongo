import React, { createContext, useContext, useReducer } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { withTheme } from '@material-ui/core/styles';

const StyledDiv = withTheme(styled.div`
  width: 100%;
  & > * + * {
    margin-top: ${(props) => props.theme.spacing(2)}px;
  }
`);

interface StateType {
  open: boolean;
  message: string;
}

type ActionType = {
  type: 'open' | 'close';
  message?: string;
};

const initialState = { open: false, message: '' };

const NoticeStateContext = createContext({} as StateType);
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NoticeDispatchContext = createContext<React.Dispatch<ActionType>>(() => {});

const reducer = (_state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'open':
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { open: true, message: action.message! };
    case 'close':
      return { open: false, message: '' };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const NoticeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NoticeStateContext.Provider value={state}>
      <NoticeDispatchContext.Provider value={dispatch}>{children}</NoticeDispatchContext.Provider>
    </NoticeStateContext.Provider>
  );
};

export const Notice: React.FC = () => {
  const state = useContext(NoticeStateContext);
  const dispatch = useContext(NoticeDispatchContext);

  return (
    <StyledDiv>
      <Snackbar open={state.open} autoHideDuration={3000} onClose={() => dispatch({ type: 'close' })}>
        <Alert variant="filled" severity="error" onClose={() => dispatch({ type: 'close' })}>
          {state.message}
        </Alert>
      </Snackbar>
    </StyledDiv>
  );
};
