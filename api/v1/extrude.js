import { assertNumber, assertShape } from './assert';

import { Shape } from './Shape';
import { assemble } from './assemble';
import { dispatch } from './dispatch';
import { extrude as extrudeAlgorithm } from '@jsxcad/algorithm-shape';
import { getZ0Surfaces } from '@jsxcad/geometry-tagged';

/**
 *
 * # Extrude
 *
 * Generates a solid from a surface.
 *
 * ::: illustration
 * ```
 * difference(circle(10),
 *            circle(8))
 * ```
 * :::
 * ::: illustration { "view": { "position": [40, 40, 60] } }
 * ```
 * difference(circle(10),
 *            circle(8))
 *   .extrude({ height: 10 })
 * ```
 * :::
 *
 **/

export const fromHeight = ({ height }, shape) => {
  // FIX: Handle extrusion along a vector properly.
  const solids = [];
  if (height === 0) {
    return shape;
  }
  for (const { tags, z0Surface } of getZ0Surfaces(shape.toKeptGeometry())) {
    solids.push(Shape.fromGeometry({
      solid: extrudeAlgorithm({ height }, z0Surface),
      tags
    }));
  }
  if (height < 0) {
    // Turn negative extrusions inside out.
    return assemble(...solids).flip();
  } else {
    return assemble(...solids);
  }
};

export const fromValue = (height, shape) => fromHeight({ height }, shape);

export const extrude = dispatch(
  'extrude',
  (height, shape) => {
    assertNumber(height);
    assertShape(shape);
    return () => fromValue(height, shape);
  },
  ({ height }, shape) => {
    assertNumber(height);
    assertShape(shape);
    return () => fromHeight({ height }, shape);
  }
);

extrude.fromValue = fromValue;
extrude.fromHeight = fromHeight;

const method = function (options) { return extrude(options, this); };
Shape.prototype.extrude = method;
