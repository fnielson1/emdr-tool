import { useEffect, useReducer, useState } from 'react';

import { Ball } from './components/Ball.tsx';
import { BallControls } from './components/BallControls.tsx';
import { Footer } from './Footer.tsx';
import {
  type AppState,
  initialAppState,
  useAppStorage,
} from './hooks/useAppStorage.ts';

export function App() {
  const [appStorage, setAppStorage] = useAppStorage(initialAppState);
  const { ballSpeed, ballColor, bgColor, ballSize } = appStorage;
  const [running, setRunning] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(5);
  const [resetKey, forceUpdate] = useReducer(state => state + 1, 0);

  const calculatedAnimationDuration = animationDuration / ballSpeed;

  const handleStartClick = (value: boolean, resetAnimation?: boolean) => {
    setRunning(value);
    if (resetAnimation) {
      forceUpdate();
    }
  };

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setRunning(true);
    setAppStorage(() => initialAppState);
    forceUpdate();
  };

  const handleBallSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ballSizeLocal = Number(e.target.value);
    setAppStorage(
      (prevState): AppState => ({
        ...prevState,
        ballSize: ballSizeLocal,
      }),
    );
  };

  const handleBallSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ballSpeedLocal = Number(e.target.value);
    setAppStorage(
      (prevState): AppState => ({
        ...prevState,
        ballSpeed: ballSpeedLocal,
      }),
    );
  };

  const handleBallColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setAppStorage(
      (prevState): AppState => ({
        ...prevState,
        ballColor: value,
      }),
    );
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setAppStorage(
      (prevState): AppState => ({
        ...prevState,
        bgColor: value,
      }),
    );
  };

  useEffect(() => {
    const updateDuration = () => {
      // Dynamically calculate the animation duration based on the screen size (viewport width)
      const screenWidth = window.innerWidth; // Get the current screen width
      const calculatedDuration = screenWidth / 100; // This formula adjusts duration based on screen width
      setAnimationDuration(calculatedDuration); // Set the duration dynamically
    };

    updateDuration();
    // Add resize event listener
    window.addEventListener('resize', updateDuration);
    return () => {
      window.removeEventListener('resize', updateDuration);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <BallControls
        isRunning={running}
        ballSpeed={ballSpeed}
        ballColor={ballColor}
        ballSize={ballSize}
        bgColor={bgColor}
        onBallSizeChange={handleBallSizeChange}
        onBgColorChange={handleBgColorChange}
        onBallColorChange={handleBallColorChange}
        onBallSpeedChange={handleBallSpeedChange}
        onStartClick={handleStartClick}
        onResetClick={handleResetClick}
      />
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Ball
          key={resetKey}
          pause={running}
          ballSize={ballSize}
          ballColor={ballColor}
          animationDuration={calculatedAnimationDuration}
        />
      </div>
      <Footer />
    </div>
  );
}
