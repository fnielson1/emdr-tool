import type { CSSProperties } from 'react';

interface BallProps {
  ballSize: number;
}

export const Ball = (props: BallProps) => {
  const { ballSize } = props;

  return (
    <div
      className="animate-move-across flex items-center justify-center rounded-full bg-blue-500 text-white"
      style={
        {
          width: `${ballSize}rem`,
          height: `${ballSize}rem`,
          '--ball-size': `${ballSize}rem`,
        } as CSSProperties
      }
    ></div>
  );
};
