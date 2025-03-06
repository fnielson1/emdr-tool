import type { CSSProperties } from 'react';

interface BallProps {
  ballSize: number;
  ballColor: string;
  animationDuration: number;
}

export const Ball = (props: BallProps) => {
  const { ballSize, ballColor, animationDuration } = props;

  return (
    <div
      className="animate-move-across flex items-center justify-center rounded-full text-white"
      style={
        {
          width: `${ballSize}rem`,
          height: `${ballSize}rem`,
          '--ball-size': `${ballSize}rem`,
          '--move-distance': `calc(100vw - ${ballSize}rem)`, // Set the distance to the full viewport width
          '--animation-duration': `${animationDuration}s`, // Use the slider value to control the speed (duration)
          backgroundColor: ballColor,
        } as CSSProperties
      }
    ></div>
  );
};
