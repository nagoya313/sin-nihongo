import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const EditableContext = createContext(false);

export const EdiableProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  return <EditableContext.Provider value={isAuthenticated}>{children}</EditableContext.Provider>;
};

export const useEditable = () => useContext(EditableContext);
