import { useRef } from 'react';

import { BallSettings } from './BallSettings.tsx';
import { RangeControl } from './RangeControl.tsx';
import {
  BALL_SIZE_STEP,
  BALL_SPEED_STEP,
  DURATION_STEP_SEC,
  MAX_BALL_SIZE,
  MAX_BALL_SPEED,
  MAX_DURATION_SEC,
  MIN_BALL_SIZE,
  MIN_BALL_SPEED,
  MIN_DURATION_SEC,
} from '../constants.ts';
import { useAppContext } from '../hooks/useAppContext.ts';
import type { RangeControlChangeType } from '../types.ts';

export const BallControls = () => {
  const {
    isRunning,
    onIsRunningChange,
    appState,
    onUpdateState,
    onCancelUndo,
  } = useAppContext();
  const { ballSize, ballSpeed, durationSeconds } = appState;
  const wasRunningRef = useRef(false);

  const adjustBallSizeForStepSize = ballSize + BALL_SIZE_STEP;

  const handleSpeedMouseDown = () => {
    wasRunningRef.current = isRunning;
    onIsRunningChange(false);
  };

  const handleSpeedMouseUp = () => {
    onIsRunningChange(wasRunningRef.current);
  };

  const handleBallSizeChange = (e: RangeControlChangeType) => {
    const value = Number(e.currentTarget.value);
    onUpdateState({ ballSize: value });
    onCancelUndo();
  };

  const handleBallSpeedChange = (e: RangeControlChangeType) => {
    const value = Number(e.currentTarget.value);
    onUpdateState({ ballSpeed: value });
    onCancelUndo();
  };

  const handleDurationChange = (e: RangeControlChangeType) => {
    const value = Number(e.currentTarget.value);
    onUpdateState({ durationSeconds: value });
    onCancelUndo();
  };

  return (
    <div className="bg-base-100 flex w-full flex-wrap justify-between gap-1 p-5 pb-2 md:flex-nowrap md:gap-4">
      <button
        className="btn min-w-20 self-center"
        title="[spacebar]"
        onClick={e => {
          e.stopPropagation();
          onIsRunningChange(!isRunning);
        }}
        onFocus={e => e.target.blur()}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>

      <RangeControl
        className="flex-1/2"
        text={`Ball Size: ${adjustBallSizeForStepSize.toFixed(1)}`}
        value={adjustBallSizeForStepSize}
        onChange={handleBallSizeChange}
        min={MIN_BALL_SIZE}
        max={MAX_BALL_SIZE}
        step={BALL_SIZE_STEP}
        onFocus={e => e.target.blur()}
        title="Up Arrow, Down Arrow"
      />
      <RangeControl
        text={`Ball Speed: ${ballSpeed.toFixed(1)}`}
        value={ballSpeed}
        min={MIN_BALL_SPEED}
        max={MAX_BALL_SPEED}
        step={BALL_SPEED_STEP}
        onChange={handleBallSpeedChange}
        onMouseDown={handleSpeedMouseDown}
        onMouseUp={handleSpeedMouseUp}
        onFocus={e => e.target.blur()}
        title="Left Arrow, Right Arrow"
      />
      <RangeControl
        text={`Duration (seconds): ${durationSeconds.toFixed(0)}`}
        value={durationSeconds}
        min={MIN_DURATION_SEC}
        max={MAX_DURATION_SEC}
        step={DURATION_STEP_SEC}
        onChange={handleDurationChange}
        onFocus={e => e.target.blur()}
        title="How long do you desire the ball to move?"
      />
      <BallSettings />
    </div>
  );
};
