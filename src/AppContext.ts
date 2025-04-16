import { createContext } from 'react';

import type { AppState } from './constants.ts';

export interface Boundary {
  width: number;
  height: number;
  top: number;
}

export interface AppContextValue {
  isRunning: boolean;
  onResetClick: () => void;
  onUndoClick: () => void;
  onIsRunningChange: (value: boolean, resetAnimation?: boolean) => void;
  onUpdateState: (updatedValue: Partial<AppState>) => void;
  onCancelUndo: () => void;
  showUndo: boolean;
  appState: AppState;
  emdrBoundary: Boundary;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
