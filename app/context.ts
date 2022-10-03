import { createContext } from 'react';
import { type ReadonlyDeep } from 'type-fest';

export type ServerStyleContextData = ReadonlyDeep<{
  key: string;
  ids: string[];
  css: string;
}>;

export const ServerStyleContext = createContext<ServerStyleContextData[] | null>(null);

export type ClientStyleContextData = {
  reset: () => void;
};

export const ClientStyleContext = createContext<ClientStyleContextData | null>(null);
