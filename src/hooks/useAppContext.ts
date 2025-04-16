import { useContext } from 'react';

import { AppContext } from '../AppContext.ts';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context == null) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
