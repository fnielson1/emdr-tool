import React from 'react';

export type RangeControlChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.SyntheticEvent<HTMLSelectElement>;

export enum BallDirection {
  horizontal = '0',
  vertical = '1',
  rightDiagonal = '2',
  leftDiagonal = '3',
}
export interface AppState {
  /**
   * The background color
   */
  bgColor: string;
  /**
   * The color of the ball
   */
  ballColor: string;
  /**
   * The size of the ball
   */
  ballSize: number;
  /**
   * How fast the ball is moving
   */
  ballSpeed: number;
  /**
   * The direction the ball is going
   */
  ballDirection: BallDirection;
  /**
   * How long the ball will bounce (seconds)
   */
  duration: number;
}

export interface XY {
  x: number;
  y: number;
}

export interface Boundary {
  width: number;
  height: number;
  /**
   * The offset of the top, as the top may not be the top of the screen
   */
  top: number;
}
