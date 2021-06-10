import React, { createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const EditableContext = createContext(false);

export const EdiableProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  return <EditableContext.Provider value={isAuthenticated}>{children}</EditableContext.Provider>;
};
