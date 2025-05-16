import { BallDirection, type Boundary, type XY } from '../types.ts';

export function getBounds(boundary: Boundary) {
  return {
    width: boundary.width || window.innerWidth,
    height: boundary.height || window.innerHeight,
  };
}

interface DetermineBallLocationProps {
  emdrBoundary: Boundary;
  location: XY;
  direction: XY;
  ballSpeed: number;
  ballSize: number;
  ballDirection: BallDirection;
}

export function determineBallLocation({
  location,
  emdrBoundary,
  direction,
  ballSpeed,
  ballSize,
  ballDirection,
}: DetermineBallLocationProps): XY {
  const currentX = location.x;
  const currentY = location.y;

  const nextX = currentX + ballSpeed * direction.x;
  const nextY = currentY + ballSpeed * direction.y;

  const bounds = getBounds(emdrBoundary);

  if (
    ballDirection === BallDirection.horizontal ||
    ballDirection === BallDirection.vertical
  ) {
    // Bounce off horizontal walls
    if (nextX <= 0 || nextX + ballSize >= bounds.width) {
      direction.x *= -1;
    }

    // Bounce off vertical walls
    if (nextY <= 0 || nextY + ballSize >= bounds.height) {
      direction.y *= -1;
    }

    // Apply updated movement
    return {
      x:
        ballDirection === BallDirection.vertical
          ? location.x
          : currentX + ballSpeed * direction.x,
      y:
        ballDirection === BallDirection.horizontal
          ? location.y
          : currentY + ballSpeed * direction.y,
    };
  } else if (
    ballDirection === BallDirection.rightDiagonal ||
    ballDirection === BallDirection.leftDiagonal
  ) {
    // Lock movement slope
    const dx = ballSpeed * direction.x;
    const dy = ballSpeed * direction.y;

    const nextX = currentX + dx;
    const nextY = currentY + dy;

    const bounds = getBounds(emdrBoundary);

    const hitsHorizontal = nextX <= 0 || nextX + ballSize >= bounds.width;
    const hitsVertical = nextY <= 0 || nextY + ballSize >= bounds.height;

    // Only bounce both directions if either wall is hit
    if (hitsHorizontal || hitsVertical) {
      direction.x *= -1;
      direction.y *= -1;
    }

    return {
      x: currentX + ballSpeed * direction.x,
      y: currentY + ballSpeed * direction.y,
    };
  }
  throw new Error(`Ball Direction is not exist: ${ballDirection}`);
}

export function normalize(vec: XY): XY {
  const length = Math.sqrt(vec.x ** 2 + vec.y ** 2);
  return { x: vec.x / length, y: vec.y / length };
}
