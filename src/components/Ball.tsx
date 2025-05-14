import { useEffect, useRef } from 'react';

import { determineBallLocation } from '../helpers/boundaryHelper.ts';
import { useAppContext } from '../hooks/useAppContext.ts';
import { BallDirection, type Boundary, type XY } from '../types.ts';

interface BallProps {
  pause: boolean;
}

export const Ball = ({ pause }: BallProps) => {
  const { appState, emdrBoundary } = useAppContext();
  const { ballSize, ballColor, ballSpeed, ballDirection } = appState;
  const ballRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<XY>({ x: 0, y: 0 });
  const directionRef = useRef<XY>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const moveBall = () => {
      if (pause && ballRef.current) {
        // Setup our initial values
        directionRef.current = getInitialDirection(ballDirection);
        locationRef.current = getInitialPosition(
          emdrBoundary,
          ballDirection,
          ballSize,
        );
        ballRef.current.style.transform = `translate(${locationRef.current.x}px, ${locationRef.current.y}px)`;
        return;
      } else if (pause || !ballRef.current) return;

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

function getInitialDirection(ballDirection: BallDirection): XY {
  switch (ballDirection) {
    case BallDirection.rightDiagonal:
      return { x: 1, y: 1 };
    case BallDirection.leftDiagonal:
      return { x: -1, y: 1 };
    case BallDirection.horizontal:
      return { x: 1, y: 0 };
    case BallDirection.vertical:
      return { x: 0, y: 1 };
    default:
      return { x: 1, y: 1 };
  }
}

function getInitialPosition(
  emdrBoundary: Boundary,
  ballDirection: BallDirection,
  ballSize: number,
): XY {
  switch (ballDirection) {
    case BallDirection.leftDiagonal:
      return {
        x: emdrBoundary.width - ballSize,
        y: 0,
      };
    default:
      return { x: 0, y: 0 };
  }
}
