import React, { createContext, useReducer } from 'react';
import { Buhin } from '@kurgm/kage-engine';
import { Glyph, Glyphs } from '@sin-nihongo/api-interfaces';
import { glyphToBuhin, glyphsToBuhin } from '../utils/kageData';

type ActionType =
  | {
      type: 'setGlyph';
      glyph: Glyph;
    }
  | {
      type: 'setGlyphs';
      glyphs: Glyphs;
    };

export const BuhinContext = createContext(new Buhin());
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const BuhinDispatchContext = createContext<React.Dispatch<ActionType>>(() => {});

const reducer = (_state: Buhin, action: ActionType): Buhin => {
  switch (action.type) {
    case 'setGlyph':
      return glyphToBuhin(action.glyph);
    case 'setGlyphs':
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
