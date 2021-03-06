import { add, dot, scale, subtract } from '@jsxcad/math-vec3';

const W = 3;

/**
 * Split the given line by the given plane.
 * Robust splitting, even if the line is parallel to the plane
 * @type {function(plane:Plane, start:Point, end:Point):Point}
 */
export const splitLineSegmentByPlane = (plane, start, end) => {
  const direction = subtract(end, start);
  let lambda = (plane[W] - dot(plane, start)) / dot(plane, direction);
  if (Number.isNaN(lambda)) lambda = 0;
  if (lambda > 1) lambda = 1;
  if (lambda < 0) lambda = 0;
  return add(start, scale(lambda, direction));
};
