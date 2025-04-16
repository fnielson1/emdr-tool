import { useEffect, useRef } from 'react';

import type { Boundary } from '../AppContext.ts';
import { BallDirection } from '../constants.ts';
import { useAppContext } from '../hooks/useAppContext.ts';

interface BallProps {
  pause: boolean;
}

export const Ball = ({ pause }: BallProps) => {
  const { appState, emdrBoundary } = useAppContext();
  const { ballSize, ballColor, ballSpeed, ballDirection } = appState;
  const ballRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const directionRef = useRef(1);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const moveBall = () => {
      if (pause || !ballRef.current) return; // Do nothing if paused

      const x = locationRef.current.x + ballSpeed * directionRef.current;
      const y = locationRef.current.y + ballSpeed * directionRef.current;

      let newLocation = { x, y: 0 };
      if (ballDirection === BallDirection.vertical) {
        newLocation = { x: 0, y };
      }

      if (
        isAtEdge(
          ballSize,
          ballSpeed,
          directionRef.current,
          emdrBoundary,
          locationRef.current.x,
          locationRef.current.y,
        )
      ) {
        newLocation.x = newLocation.x + 5 + ballSpeed * directionRef.current;
        directionRef.current *= -1;
      }

      console.log('newLocation', newLocation.x);
      locationRef.current = newLocation;
      ballRef.current.style.transform = `translate(${locationRef.current.x}px, ${locationRef.current.y}px)`;
      animationFrameRef.current = requestAnimationFrame(moveBall);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(moveBall);

    // Clean up when component unmounts or pause changes
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ballDirection, ballSize, ballSpeed, emdrBoundary, pause]);

  return (
    <div
      ref={ballRef}
      className="flex items-center justify-center rounded-full"
      style={{
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        transform: `translate(${locationRef.current.x}px, ${locationRef.current.y}px)`,
        backgroundColor: ballColor,
        boxShadow: `0px 0px 0px ${ballColor}`,
      }}
    ></div>
  );
};

// Helper function stays the same
function isAtEdge(
  ballSize: number,
  ballSpeed: number,
  direction: number,
  emdrBoundary: Boundary,
  x: number,
  y: number,
): boolean {
  const vw = emdrBoundary.width || window.innerWidth;
  const vh = emdrBoundary.height || window.innerHeight;

  const adjustedX = x + (ballSize + ballSpeed);
  const adjustedY = y + (ballSize + ballSpeed) - emdrBoundary.top;

  console.log('adjustedx', adjustedX);
  if (direction < 0) {
    return x < 0 || adjustedY < emdrBoundary.top;
  } else {
    return adjustedX >= vw || adjustedY >= vh;
  }
}
