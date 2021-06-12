import React, { createContext, useCallback, useContext, useReducer } from 'react';
import styled from 'styled-components';
import { Color } from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { withTheme } from '@material-ui/core/styles';

type Store = { open: boolean; severity?: Color; message?: string };
type Action = { type: 'open'; severity: Color; message: string } | { type: 'close' };

const NoticeStateContext = createContext({} as Store);
// eslint-disable-next-line @typescript-eslint/no-empty-function
const NoticeDispatchContext = createContext<React.Dispatch<Action>>(() => {});

const reducer: React.Reducer<Store, Action> = (state, action): Store => {
  switch (action.type) {
    case 'open':
      return { open: true, message: action.message, severity: action.severity };
    case 'close':
      return { ...state, open: false };
  }
};

const initialState = { open: false, message: '' };

export const NoticeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NoticeStateContext.Provider value={state}>
      <NoticeDispatchContext.Provider value={dispatch}>{children}</NoticeDispatchContext.Provider>
    </NoticeStateContext.Provider>
  );
};

const StyledDiv = withTheme(styled.div`
  width: 100%;
  & > * + * {
    margin-top: ${(props) => props.theme.spacing(2)}px;
  }
`);

export const useDisplayNotice = () => {
  const dispatch = useContext(NoticeDispatchContext);
  const displaySuccess = useCallback((message: string) => dispatch({ type: 'open', message, severity: 'success' }), [
    dispatch,
  ]);
  const displayInfo = useCallback((message: string) => dispatch({ type: 'open', message, severity: 'info' }), [
    dispatch,
  ]);
  const displayError = useCallback((message: string) => dispatch({ type: 'open', message, severity: 'error' }), [
    dispatch,
  ]);
  const displayWarning = useCallback((message: string) => dispatch({ type: 'open', message, severity: 'warning' }), [
    dispatch,
  ]);
  return { displaySuccess, displayInfo, displayError, displayWarning };
};

export const Notice: React.FC = () => {
  const state = useContext(NoticeStateContext);
  const dispatch = useContext(NoticeDispatchContext);

  const handleClose = () => dispatch({ type: 'close' });

  return (
    <StyledDiv>
      <Snackbar open={state.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" severity={state.severity} onClose={handleClose}>
          {state.message}
        </Alert>
      </Snackbar>
    </StyledDiv>
  );
};
