import { useCallback, useEffect, useReducer, useState } from 'react';

import { Ball } from './components/Ball.tsx';
import { BallControls } from './components/BallControls.tsx';
import { Footer } from './Footer.tsx';
import {
  type AppState,
  initialAppState,
  useAppStorage,
} from './hooks/useAppStorage.ts';
import { useKeyboardWatcher } from './hooks/useKeyboardWatcher.ts';

export function App() {
  const [appState, setAppState] = useAppStorage(initialAppState);
  const { ballSpeed, ballColor, bgColor, ballSize } = appState;
  const [isRunning, setIsRunning] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(5);
  const [resetKey, forceUpdate] = useReducer(state => state + 1, 0);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [previousState, setPreviousState] = useState<AppState | null>(null);

  const calculatedAnimationDuration = animationDuration / ballSpeed;

  const updateState = (updatedValue: Partial<AppState>) => {
    setAppState((prevState): AppState => ({ ...prevState, ...updatedValue }));
  };

  const handleResetClick = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setPreviousState({ ...appState });
    setAppState(() => initialAppState);

    // Set a timer for undo
    const id = window.setTimeout(() => {
      setPreviousState(null);
    }, 3000);
    setTimeoutId(id);
  }, [appState, setAppState, timeoutId]);

  const handleUndoClick = useCallback(() => {
    // Undo the reset by restoring the previous state
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the timeout
    }
    if (previousState) {
      setAppState(previousState); // Restore the previous state
    }
    setPreviousState(null);
  }, [previousState, setAppState, timeoutId]);

  const handleCancelUndo = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the timeout
    }
    setPreviousState(null);
  }, [timeoutId]);

  useKeyboardWatcher(setAppState, handleCancelUndo);

  const handleIsRunningChange = (value: boolean, resetAnimation?: boolean) => {
    setIsRunning(value);
    if (resetAnimation) {
      forceUpdate();
    }
  };

  const handleBallSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateState({ ballSize: value });
    handleCancelUndo();
  };

  const handleBallSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateState({ ballSpeed: value });
    handleCancelUndo();
  };

  const handleBallColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    updateState({ ballColor: value });
    handleCancelUndo();
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    updateState({ bgColor: value });
    handleCancelUndo();
  };

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          setIsRunning(prevState => !prevState);
          break;
        case 'Escape':
          setIsRunning(false);
          forceUpdate();
          break;
      }
    };
    const updateDuration = () => {
      // Dynamically calculate the animation duration based on the screen size (viewport width)
      const screenWidth = window.innerWidth; // Get the current screen width
      const calculatedDuration = screenWidth / 100; // This formula adjusts duration based on screen width
      setAnimationDuration(calculatedDuration); // Set the duration dynamically
    };
    updateDuration();

    window.addEventListener('keyup', onKeyPress);
    window.addEventListener('resize', updateDuration);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
      window.removeEventListener('resize', updateDuration);
    };
  }, [handleResetClick, handleUndoClick]);

  return (
    <div className="flex min-h-screen flex-col">
      <BallControls
        isRunning={isRunning}
        ballSpeed={ballSpeed}
        ballColor={ballColor}
        ballSize={ballSize}
        bgColor={bgColor}
        showUndo={Boolean(previousState)}
        onBallSizeChange={handleBallSizeChange}
        onBgColorChange={handleBgColorChange}
        onBallColorChange={handleBallColorChange}
        onBallSpeedChange={handleBallSpeedChange}
        onIsRunningChange={handleIsRunningChange}
        onResetClick={handleResetClick}
        onUndoClick={handleUndoClick}
      />
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Ball
          key={resetKey}
          pause={!isRunning}
          ballSize={ballSize}
          ballColor={ballColor}
          animationDuration={calculatedAnimationDuration}
        />
      </div>
      <Footer />
    </div>
  );
}
