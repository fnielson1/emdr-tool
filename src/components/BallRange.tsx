import type { ComponentProps } from 'react';

import { BallRangeChangeType } from '../types';

interface BallRangeProps extends Omit<ComponentProps<'input'>, 'onSelect'> {
  text: string;
  onChange?: (e: BallRangeChangeType) => void;
}

export const BallRange = (props: BallRangeProps) => {
  const { min, max, step, text, value, onChange, className, title } = props;

  const options: number[] = [];
  for (let i = 0; i <= Number(max); i += Number(step)) {
    options.push(i);
  }

  return (
    <>
      <div
        className={`hidden w-full flex-col justify-between md:visible md:flex ${className}`}
      >
        {text}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="range range-primary"
          onFocus={e => e.target.blur()}
          title={title}
        />
      </div>
      <div
        className={`visible flex w-full flex-col justify-between md:hidden ${className}`}
      >
        {text}
        <select
          className="select select-md"
          value={value}
          onFocus={e => e.target.blur()}
          onChange={e => onChange?.(e)}
        >
          {options.map((optionValue: number) => {
            return (
              <option key={`option-value-${optionValue}`} value={optionValue}>
                {optionValue}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
