import { useRef } from 'react';

import { BallRange } from './BallRange.tsx';
import {
  BALL_SIZE_STEP,
  BALL_SPEED_STEP,
  MAX_BALL_SIZE,
  MAX_BALL_SPEED,
  MIN_BALL_SIZE,
  MIN_BALL_SPEED,
} from '../hooks/useAppStorage.ts';
import type { BallRangeChangeType } from '../types.ts';

interface BallControlsProps {
  ballSize: number;
  ballSpeed: number;
  ballColor: string;
  bgColor: string;
  isRunning: boolean;
  onBallSizeChange: (e: BallRangeChangeType) => void;
  onBallSpeedChange: (e: BallRangeChangeType) => void;
  onBallColorChange: (e: BallRangeChangeType) => void;
  onBgColorChange: (e: BallRangeChangeType) => void;
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
    <div className="bg-base-100 flex w-full flex-wrap justify-between gap-1 p-5 pb-2 md:flex-nowrap md:gap-4">
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
      <BallRange
        text={`Ball Size: ${ballSize.toFixed(0)}`}
        value={ballSize}
        onChange={onBallSizeChange}
        min={MIN_BALL_SIZE}
        max={MAX_BALL_SIZE}
        step={BALL_SIZE_STEP}
        onFocus={e => e.target.blur()}
        title="Up Arrow, Down Arrow"
      />
      <BallRange
        text={`Ball Speed: ${ballSpeed.toFixed(0)}`}
        value={ballSpeed}
        min={MIN_BALL_SPEED}
        max={MAX_BALL_SPEED}
        step={BALL_SPEED_STEP}
        onChange={onBallSpeedChange}
        onMouseDown={handleSpeedMouseDown}
        onMouseUp={handleSpeedMouseUp}
        onFocus={e => e.target.blur()}
        title="Left Arrow, Right Arrow"
      />
      <div className="flex w-full items-center gap-2 md:flex-col md:justify-between">
        <div className="hidden md:block">Ball Color</div>
        <input
          type="color"
          value={ballColor}
          onChange={onBallColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
          onFocus={e => e.target.blur()}
        />
        <div className="block md:hidden">Ball Color</div>
      </div>
      <div className="flex w-full items-center gap-2 md:flex-col md:justify-between">
        <div className="hidden md:block">Background Color</div>
        <input
          type="color"
          value={bgColor}
          onChange={onBgColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
          onFocus={e => e.target.blur()}
        />
        <div className="block md:hidden">Background Color</div>
      </div>
    </div>
  );
};
