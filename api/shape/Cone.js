import {
  getAt,
  getCorner1,
  getCorner2,
  getFrom,
  getMatrix,
  getSides,
  getTo,
} from './Plan.js';
import { registerReifier, taggedPlan } from '@jsxcad/geometry';

import Arc from './Arc.js';
import Hull from './Hull.js';
import Point from './Point.js';
import Shape from './Shape.js';
import { negate } from '@jsxcad/math-vec3';

const Z = 2;

// FIX: This looks wrong.
registerReifier('Cone', (geometry) => {
  const [x, y, z] = getCorner2(geometry);
  return Hull(
    Arc(x, y).hasSides(getSides(geometry, 32)).z(z),
    Point(0, 0, getCorner1(geometry)[Z])
  )
    .orient({
      center: negate(getAt(geometry)),
      from: getFrom(geometry),
      at: getTo(geometry),
    })
    .transform(getMatrix(geometry))
    .setTags(geometry.tags)
    .toGeometry();
});

export const Cone = (diameter = 1, top = 1, base = -top) =>
  Shape.fromGeometry(taggedPlan({}, { type: 'Cone' }))
    .hasCorner1(0, 0, top)
    .hasCorner2(diameter, diameter, base);

Shape.prototype.Cone = Shape.shapeMethod(Cone);

export default Cone;
