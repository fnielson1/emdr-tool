import { useEffect, useRef } from 'react';

import { HamburgerIcon } from './HamburgerIcon.tsx';
import { BallDirection } from '../constants.ts';
import { useAppContext } from '../hooks/useAppContext.ts';
import type { BallRangeChangeType } from '../types.ts';

interface BallSettingsProps {
  className?: string;
}

export const BallSettings = ({ className }: BallSettingsProps) => {
  const {
    appState,
    onUpdateState,
    onCancelUndo,
    showUndo,
    onUndoClick,
    onResetClick,
  } = useAppContext();
  const { bgColor, ballColor, ballDirection } = appState;

  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const handleBallColorChange = (e: BallRangeChangeType) => {
    const value = e.currentTarget.value;
    onUpdateState({ ballColor: value });
    onCancelUndo();
  };

  const handleBgColorChange = (e: BallRangeChangeType) => {
    const value = e.currentTarget.value;
    onUpdateState({ bgColor: value });
    onCancelUndo();
  };

  const handleBallDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.currentTarget.value as unknown as BallDirection;
    onUpdateState({ ballDirection: value });
    onCancelUndo();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.open = false;
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <details className={`dropdown ${className}`} ref={dropdownRef}>
      <summary
        className="btn m-1 flex flex-col gap-1 p-2"
        onFocus={e => e.target.blur()}
      >
        <HamburgerIcon />
      </summary>
      <div className="bg-base-100 absolute left-2 mt-2.5 flex flex-col gap-2 rounded-lg p-4 md:left-auto md:right-2">
        <div className="flex flex-col">
          <div>Ball Color</div>
          <input
            type="color"
            value={ballColor}
            onChange={handleBallColorChange}
            className="h-10 w-16 cursor-pointer rounded-3xl"
            onFocus={e => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <div>Background Color</div>
          <input
            type="color"
            value={bgColor}
            onChange={handleBgColorChange}
            className="h-10 w-16 cursor-pointer rounded-3xl"
            onFocus={e => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <div>Direction</div>
          <select
            onChange={handleBallDirectionChange}
            className="select min-w-56"
            value={ballDirection}
          >
            <option value={BallDirection.horizontal}>Horizontal</option>
            <option value={BallDirection.vertical}>Vertical</option>
            <option value={BallDirection.rightDiagonal}>Right diagonal</option>
            <option value={BallDirection.leftDiagonal}>Left diagonal</option>
          </select>
        </div>
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
      </div>
    </details>
  );
};
