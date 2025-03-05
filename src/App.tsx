import { useState } from 'react';

import { Ball } from './components/Ball.tsx';
import { Footer } from './Footer.tsx';

export function App() {
  const [ballSize, setBallSize] = useState(5); // Default ball size

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBallSize(Number(event.target.value)); // Update the ball size based on slider
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ul className="menu menu-horizontal bg-base-200 rounded-box w-full">
        <li>
          <input
            id="ball-size-slider"
            type="range"
            min="5"
            max="25"
            step="1"
            value={ballSize}
            onChange={handleSliderChange}
            className="range range-primary"
          />
        </li>
        <li>
          <a>Item 2</a>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
      <div className="flex flex-1 flex-col justify-center bg-green-100">
        <Ball ballSize={ballSize} />
      </div>
      <Footer />
    </div>
  );
}
