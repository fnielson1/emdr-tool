export type BallRangeChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.SyntheticEvent<HTMLSelectElement>;

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

export interface XY {
  x: number;
  y: number;
}

export interface Boundary {
  width: number;
  height: number;
  top: number;
}
