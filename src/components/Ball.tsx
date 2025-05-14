import { useEffect, useRef } from 'react';

import { determineBallLocation } from '../helpers/boundaryHelper.ts';
import { useAppContext } from '../hooks/useAppContext.ts';
import { type XY } from '../types.ts';

interface BallProps {
  pause: boolean;
}

export const Ball = ({ pause }: BallProps) => {
  const { appState, emdrBoundary } = useAppContext();
  const { ballSize, ballColor, ballSpeed, ballDirection } = appState;
  const ballRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<XY>({
    x: 0,
    y: 0,
  });
  const directionRef = useRef<XY>({ x: 1, y: 1 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const moveBall = () => {
      if (pause || !ballRef.current) return;

      locationRef.current = determineBallLocation({
        ballSpeed: ballSpeed,
        ballSize: ballSize,
        location: locationRef.current,
        direction: directionRef.current,
        emdrBoundary: emdrBoundary,
        ballDirection: ballDirection,
      });

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
