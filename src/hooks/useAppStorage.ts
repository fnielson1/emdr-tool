import { useLocalStorage } from './useLocalStorage.ts';

export interface AppState {
  bgColor: string;
  ballColor: string;
  ballSize: number;
  ballSpeed: number;
}

export const initialAppState: AppState = {
  bgColor: '#000000',
  ballColor: '#2B7FFF',
  ballSize: 5,
  ballSpeed: 5,
};

export function useAppStorage(initialValue: AppState) {
  return useLocalStorage<AppState>('EMDR_APP', initialValue);
}
