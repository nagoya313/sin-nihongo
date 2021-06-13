import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { Buhin } from '@kurgm/kage-engine';
import { GlyphResponse, GlyphsResponse } from '@sin-nihongo/api-interfaces';
import { glyphToBuhin, glyphsToBuhin } from '../utils/kageData';

type ActionType =
  | {
      type: 'SET_GLYPH';
      glyph: GlyphResponse;
    }
  | {
      type: 'SET_GLYPHS';
      glyphs: GlyphsResponse;
    };

const BuhinContext = createContext(new Buhin());
// eslint-disable-next-line @typescript-eslint/no-empty-function
const BuhinDispatchContext = createContext<React.Dispatch<ActionType>>(() => {});

const reducer = (_state: Buhin, action: ActionType): Buhin => {
  switch (action.type) {
    case 'SET_GLYPH':
      return glyphToBuhin(action.glyph);
    case 'SET_GLYPHS':
      return glyphsToBuhin(action.glyphs);
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export const BuhinProvider: React.FC = ({ children }) => {
  const [buhin, dispatch] = useReducer(reducer, new Buhin());

  return (
    <BuhinContext.Provider value={buhin}>
      <BuhinDispatchContext.Provider value={dispatch}>{children}</BuhinDispatchContext.Provider>
    </BuhinContext.Provider>
  );
};

export const useBuhin = () => useContext(BuhinContext);

export const useSetGlyphBuhin = () => {
  const dispatch = useContext(BuhinDispatchContext);

  const useSetGlyphBuhin = useCallback(
    (glyph: GlyphResponse) => {
      dispatch({ type: 'SET_GLYPH', glyph });
    },
    [dispatch]
  );

  return useSetGlyphBuhin;
};
