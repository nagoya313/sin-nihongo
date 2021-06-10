import React, { createContext, useReducer } from 'react';
import { Color } from '@material-ui/lab/Alert';

type StateType = {
  open: boolean;
  severity?: Color;
  message?: string;
};

type ActionType =
  | {
      type: 'open';
      severity: Color;
      message: string;
    }
  | {
      type: 'close';
    };

export const NoticeStateContext = createContext({} as StateType);
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NoticeDispatchContext = createContext<React.Dispatch<ActionType>>(() => {});

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'open':
      return { open: true, message: action.message, severity: action.severity };
    case 'close':
      return { ...state, open: false };
    default:
      throw new Error(`Unhandled action type: ${action}`);
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
