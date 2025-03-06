import { useRef } from 'react';

import {
  BALL_SIZE_STEP,
  BALL_SPEED_STEP,
  MAX_BALL_SIZE,
  MAX_BALL_SPEED,
  MIN_BALL_SIZE,
  MIN_BALL_SPEED,
} from '../hooks/useAppStorage.ts';

interface BallControlsProps {
  ballSize: number;
  ballSpeed: number;
  ballColor: string;
  bgColor: string;
  isRunning: boolean;
  onBallSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBallSpeedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBallColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBgColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetClick: () => void;
  onUndoClick: () => void;
  onIsRunningChange: (value: boolean, resetAnimation?: boolean) => void;
  showUndo: boolean;
}

export const BallControls = (props: BallControlsProps) => {
  const {
    ballColor,
    ballSpeed,
    ballSize,
    bgColor,
    isRunning,
    onBallColorChange,
    onBallSpeedChange,
    onBallSizeChange,
    onBgColorChange,
    onIsRunningChange,
    onResetClick,
    onUndoClick,
    showUndo,
  } = props;

  const wasRunningRef = useRef<boolean>(false);

  const handleSpeedMouseDown = () => {
    wasRunningRef.current = isRunning;
    onIsRunningChange(false);
  };

  const handleSpeedMouseUp = () => {
    onIsRunningChange(wasRunningRef.current);
  };

  return (
    <div className="join join-horizontal bg-base-100 flex w-full justify-between gap-4 p-5 pb-2">
      <button
        className="btn self-center"
        onClick={e => {
          e.stopPropagation();
          onIsRunningChange(!isRunning, true);
        }}
        onFocus={e => e.target.blur()}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button
        className="btn self-center"
        onClick={e => {
          e.stopPropagation();
          if (showUndo) {
            onUndoClick();
          } else {
            onResetClick();
          }
        }}
        onFocus={e => e.target.blur()}
      >
        {showUndo ? 'Undo' : 'Reset'}
      </button>
      <div className="flex w-full flex-col justify-between">
        Ball Size: {ballSize.toFixed(0)}
        <input
          type="range"
          min={MIN_BALL_SIZE}
          max={MAX_BALL_SIZE}
          step={BALL_SIZE_STEP}
          value={ballSize}
          onChange={onBallSizeChange}
          className="range range-primary"
          onFocus={e => e.target.blur()}
          title="Up Arrow, Down Arrow"
        />
      </div>
      <div className="flex w-full flex-col justify-between">
        Ball Speed: {ballSpeed.toFixed(1)}
        <input
          type="range"
          min={MIN_BALL_SPEED}
          max={MAX_BALL_SPEED}
          step={BALL_SPEED_STEP}
          value={ballSpeed}
          onChange={onBallSpeedChange}
          className="range range-primary"
          onMouseDown={handleSpeedMouseDown}
          onMouseUp={handleSpeedMouseUp}
          onFocus={e => e.target.blur()}
          title="Left Arrow, Right Arrow"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        Ball Color
        <input
          type="color"
          value={ballColor}
          onChange={onBallColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
          onFocus={e => e.target.blur()}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-between text-nowrap">
        Background Color
        <input
          type="color"
          value={bgColor}
          onChange={onBgColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
          onFocus={e => e.target.blur()}
        />
      </div>
    </div>
  );
};
