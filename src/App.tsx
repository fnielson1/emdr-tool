import { useEffect, useState } from 'react';

import { Ball } from './components/Ball.tsx';
import { Footer } from './Footer.tsx';

export function App() {
  const [bgColor, setBgColor] = useState('#000000');
  const [ballColor, setBallColor] = useState('#2B7FFF');
  const [ballSize, setBallSize] = useState(5);
  const [ballSpeed, setBallSpeed] = useState(5);
  const [animationDuration, setAnimationDuration] = useState(5);

  const calculatedAnimationDuration = animationDuration / ballSpeed;

  const handleBallSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBallSize(Number(e.target.value));
  };

  const handleBallSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ballSpeedLocal = Number(e.target.value);
    setBallSpeed(ballSpeedLocal);
  };

  const handleBallColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBallColor(e.currentTarget.value);
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(e.currentTarget.value);
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
      <div className="join join-horizontal bg-base-100 grid w-full grid-cols-1 grid-rows-4 place-items-center gap-2 p-5 pb-0 lg:grid-cols-4 lg:grid-rows-2">
        <div>Ball Size: {ballSize}</div>
        <div>Ball Speed: {ballSpeed.toFixed(2)}</div>
        <div>Ball Color</div>
        <div>Background Color</div>
        <input
          type="range"
          min="5"
          max="25"
          step="1"
          value={ballSize}
          onChange={handleBallSizeChange}
          className="range range-primary"
        />
        <input
          type="range"
          min="0.1"
          max="20"
          step="0.1"
          value={ballSpeed}
          onChange={handleBallSpeedChange}
          className="range range-primary"
        />
        <input
          type="color"
          value={ballColor}
          onChange={handleBallColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
        />
        <input
          type="color"
          value={bgColor}
          onChange={handleBgColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
        />
      </div>
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Ball
          ballSize={ballSize}
          ballColor={ballColor}
          animationDuration={calculatedAnimationDuration}
        />
      </div>
      <Footer />
    </div>
  );
}
