import { useLocalStorage } from './useLocalStorage.ts';

export const MIN_BALL_SIZE = 1;
export const MIN_BALL_SPEED = 1;
export const MAX_BALL_SIZE = 25;
export const MAX_BALL_SPEED = 20;
export const BALL_SIZE_STEP = 1;
export const BALL_SPEED_STEP = 1;

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
