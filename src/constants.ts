export const MIN_BALL_SIZE = 50;
export const MIN_BALL_SPEED = 3;
export const MAX_BALL_SIZE = 200;
export const MAX_BALL_SPEED = 40;
export const BALL_SIZE_STEP = 10;
export const BALL_SPEED_STEP = 0.5;

export enum BallDirection {
  horizontal = '0',
  vertical = '1',
  rightDiagonal = '2',
  leftDiagonal = '3',
}

export interface AppState {
  bgColor: string;
  ballColor: string;
  ballSize: number;
  ballSpeed: number;
  ballDirection: BallDirection;
}
