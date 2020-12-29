import { Shape, shapeMethod } from '@jsxcad/api-v1-shape';

import { buildRingSphere } from '@jsxcad/algorithm-shape';
import { getRadius } from '@jsxcad/geometry-plan';
import { orRadius } from './orRadius.js';
import { taggedSolid } from '@jsxcad/geometry-tagged';

const unitBall = (resolution = 16) => {
  const shape = Shape.fromGeometry(
    taggedSolid({}, buildRingSphere(resolution))
  );
  return shape.toGraph();
};

export const Ball = (value = 1, { resolution = 16 } = {}) => {
  const plan = orRadius(value);
  return unitBall(resolution).scale(getRadius(plan)).at(plan.at);
};

Shape.prototype.Ball = shapeMethod(Ball);
Shape.prototype.Orb = shapeMethod(Ball);

export default Ball;
