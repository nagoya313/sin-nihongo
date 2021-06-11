import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// プロバイダで括つた中でのみ編輯可能かどうかを返したいので、範囲外でのアクセス値は常に偽を返す
const EditableContext = createContext(false);

export const EdiableProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  return <EditableContext.Provider value={isAuthenticated}>{children}</EditableContext.Provider>;
};

export const useEditable = () => {
  return useContext(EditableContext);
};
