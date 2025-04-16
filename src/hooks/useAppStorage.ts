import { useLocalStorage } from './useLocalStorage.ts';
import { type AppState, BallDirection, MAX_BALL_SIZE } from '../constants.ts';

export const initialAppState: AppState = {
  bgColor: '#000000',
  ballColor: '#2B7FFF',
  ballSize: MAX_BALL_SIZE / 2,
  ballSpeed: 5,
  ballDirection: BallDirection.horizontal,
};

export function useAppStorage(initialValue: AppState) {
  return useLocalStorage<AppState>('EMDR_APP', initialValue);
}
