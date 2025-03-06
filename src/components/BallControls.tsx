import { useRef } from 'react';

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
  onResetClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onUndoClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button
        className="btn self-center"
        onClick={e => {
          if (showUndo) {
            onUndoClick(e);
          } else {
            onResetClick(e);
          }
        }}
      >
        {showUndo ? 'Undo' : 'Reset'}
      </button>
      <div className="flex w-full flex-col justify-between">
        Ball Size: {ballSize}
        <input
          type="range"
          min="1"
          max="25"
          step="1"
          value={ballSize}
          onChange={onBallSizeChange}
          className="range range-primary"
        />
      </div>
      <div className="flex w-full flex-col justify-between">
        Ball Speed: {ballSpeed.toFixed(2)}
        <input
          type="range"
          min="0.1"
          max="20"
          step="0.1"
          value={ballSpeed}
          onChange={onBallSpeedChange}
          className="range range-primary"
          onMouseDown={handleSpeedMouseDown}
          onMouseUp={handleSpeedMouseUp}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        Ball Color
        <input
          type="color"
          value={ballColor}
          onChange={onBallColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-between text-nowrap">
        Background Color
        <input
          type="color"
          value={bgColor}
          onChange={onBgColorChange}
          className="h-10 w-16 cursor-pointer rounded-3xl"
        />
      </div>
    </div>
  );
};
