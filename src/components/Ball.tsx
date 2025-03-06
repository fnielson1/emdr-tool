import type { CSSProperties } from 'react';

interface BallProps {
  ballSize: number;
  ballColor: string;
  animationDuration: number;
  pause: boolean;
}

export const Ball = (props: BallProps) => {
  const { ballSize, ballColor, animationDuration, pause } = props;

  return (
    <div
      className="animate-move-across flex items-center justify-center rounded-full text-white"
      style={
        {
          width: `${ballSize}rem`,
          height: `${ballSize}rem`,
          '--ball-size': `${ballSize}rem`,
          '--animation-duration': `${animationDuration}s`, // Use the slider value to control the speed (duration)
          animationPlayState: pause ? 'paused' : 'running',
          backgroundColor: ballColor,
          boxShadow: `0px 0px 0px ${ballColor}`,
        } as CSSProperties
      }
    ></div>
  );
};
