import Shape from './Shape';
import shell from './shell';

/**
 *
 * # expand
 *
 * Moves the edges of the shape inward by the specified amount.
 *
 * ::: illustration { "view": { "position": [60, -60, 60], "target": [0, 0, 0] } }
 * ```
 * Cube(10).with(Cube(10).moveX(10).expand(2))
 * ```
 * :::
 **/

export const expand = (shape, amount = 1, { resolution = 16 }) =>
  (amount >= 0)
    ? shape.union(shell(shape, amount, resolution))
    : shape.cut(shell(shape, -amount, resolution));

const method = function (...args) { return expand(this, ...args); };
Shape.prototype.expand = method;

export default expand;