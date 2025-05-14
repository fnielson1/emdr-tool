import { createContext } from 'react';

import type { AppState, Boundary } from './types.ts';

export interface AppContextValue {
  isRunning: boolean;
  onResetClick: () => void;
  onUndoClick: () => void;
  onIsRunningChange: (value: boolean) => void;
  onUpdateState: (updatedValue: Partial<AppState>) => void;
  onCancelUndo: () => void;
  showUndo: boolean;
  appState: AppState;
  emdrBoundary: Boundary;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
