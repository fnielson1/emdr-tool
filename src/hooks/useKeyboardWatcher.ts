import { useEffect } from 'react';

import {
  type AppState,
  BALL_SIZE_STEP,
  BALL_SPEED_STEP,
  MAX_BALL_SIZE,
  MAX_BALL_SPEED,
  MIN_BALL_SIZE,
  MIN_BALL_SPEED,
} from './useAppStorage.ts';

export function useKeyboardWatcher(
  setAppState: React.Dispatch<React.SetStateAction<AppState>>,
  cancelUndo: () => void,
) {
  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      cancelUndo();
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          setAppState(
            (prevState): AppState => ({
              ...prevState,
              ballSize:
                MAX_BALL_SIZE >= prevState.ballSize + BALL_SIZE_STEP
                  ? prevState.ballSize + BALL_SIZE_STEP
                  : prevState.ballSize,
            }),
          );
          break;
        case 's':
        case 'ArrowDown':
          setAppState(
            (prevState): AppState => ({
              ...prevState,
              ballSize:
                MIN_BALL_SIZE <= prevState.ballSize - BALL_SIZE_STEP
                  ? prevState.ballSize - BALL_SIZE_STEP
                  : prevState.ballSize,
            }),
          );
          break;
        case 'd':
        case 'ArrowRight':
          setAppState(
            (prevState): AppState => ({
              ...prevState,
              ballSpeed:
                MAX_BALL_SPEED >= prevState.ballSpeed + BALL_SPEED_STEP
                  ? prevState.ballSpeed + BALL_SPEED_STEP
                  : prevState.ballSpeed,
            }),
          );
          break;
        case 'a':
        case 'ArrowLeft':
          setAppState(
            (prevState): AppState => ({
              ...prevState,
              ballSpeed:
                MIN_BALL_SPEED <= prevState.ballSpeed - BALL_SPEED_STEP
                  ? prevState.ballSpeed - BALL_SPEED_STEP
                  : prevState.ballSpeed,
            }),
          );
          break;
      }
    };

    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [setAppState]);
}
