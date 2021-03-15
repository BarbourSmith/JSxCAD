import Shape from './Shape.js';
import move from './move.js';

/**
 *
 * # MoveY
 *
 * Move along the Y axis.
 *
 */

export const moveY = (shape, y = 0) => move(shape, 0, y);

const moveYMethod = function (y) {
  return moveY(this, y);
};
Shape.prototype.y = moveYMethod;

export default moveY;