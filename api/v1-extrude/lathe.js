import { Shape, assemble } from '@jsxcad/api-v1-shape';

import { Y } from '@jsxcad/api-v1-connector';
import { getPaths } from '@jsxcad/geometry-tagged';
import { lathe as lathePath } from '@jsxcad/algorithm-shape';

/**
 *
 * # Lathe
 *
 * ::: illustration { "view": { "position": [-80, -80, 80] } }
 * ```
 * ```
 * :::
 *
 **/

export const lathe = (shape, endDegrees = 360, { sides = 32 } = {}) => {
  const profile = shape.chop(Y(0));
  const outline = profile.outline();
  const solids = [];
  for (const geometry of getPaths(outline.toKeptGeometry())) {
    for (const path of geometry.paths) {
      solids.push(Shape.fromGeometry(lathePath(path, endDegrees * Math.PI / 180, sides)));
    }
  }
  return assemble(...solids);
};

const latheMethod = function (...args) { return lathe(this, ...args); };
Shape.prototype.lathe = latheMethod;

export default lathe;

lathe.signature = 'lathe(shape:Shape, endDegrees:number = 360, { resolution:number = 5 })';
latheMethod.signature = 'Shape -> lathe(endDegrees:number = 360, { resolution:number = 5 })';
