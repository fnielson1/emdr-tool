import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

import { AppContext } from './AppContext.ts';
import { Ball } from './components/Ball.tsx';
import { BallControls } from './components/BallControls.tsx';
import { Header } from './Header.tsx';
import { initialAppState, useAppStorage } from './hooks/useAppStorage.ts';
import { useKeyboardWatcher } from './hooks/useKeyboardWatcher.ts';
import type { AppState, Boundary } from './types.ts';

export function App() {
  const [appState, setAppState] = useAppStorage(initialAppState);
  const { bgColor } = appState;
  const [isRunning, setIsRunning] = useState(false);
  const [resetKey, forceUpdate] = useReducer(state => state + 1, 0);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [previousState, setPreviousState] = useState<AppState | null>(null);
  const [emdrBoundary, setEmdrBoundary] = useState<Boundary>({
    width: 0,
    height: 0,
    top: 0,
  });
  const parentRef = useRef<HTMLDivElement>(null);

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

    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, [handleResetClick, handleUndoClick]);

  useEffect(() => {
    const element = parentRef.current;
    if (!element) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height, top } = entry.target.getBoundingClientRect();
        setEmdrBoundary({ width, height, top });
      }
    });
    observer.observe(element);

    const { width, height, top } = element.getBoundingClientRect();
    setEmdrBoundary({ width, height, top });

    // Clean up
    return () => observer.disconnect();
  }, []);

  return (
    <AppContext
      value={{
        appState,
        isRunning,
        emdrBoundary,
        onCancelUndo: handleCancelUndo,
        onIsRunningChange: handleIsRunningChange,
        onResetClick: handleResetClick,
        onUndoClick: handleUndoClick,
        showUndo: Boolean(previousState),
        onUpdateState: updateState,
      }}
    >
      <div className="flex min-h-screen flex-col overflow-clip">
        <Header />
        <BallControls />
        <div
          ref={parentRef}
          className="flex flex-1 flex-col"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <Ball key={resetKey} pause={!isRunning} />
        </div>
      </div>
    </AppContext>
  );
}
