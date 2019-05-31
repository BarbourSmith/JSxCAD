import { Shape, fromGeometry, toGeometry } from './Shape';
import { difference as differenceGeometry } from '@jsxcad/geometry-eager';

/**
 *
 * # Difference
 *
 * Difference produces a version of the first shape with the remaining shapes removed, where applicable.
 * Different kinds of shapes do not interact. e.g., you cannot subtract a surface from a solid.
 *
 * ::: illustration { "view": { "position": [40, 40, 40] } }
 * ```
 * difference(cube(10).below(),
 *            cube(5).below())
 * ```
 * :::
 * ::: illustration
 * ```
 * difference(circle(10),
 *            circle(2.5))
 * ```
 * :::
 * ::: illustration { "view": { "position": [5, 5, 5] } }
 * ```
 * difference(assemble(cube().below(),
 *                     cube().above()),
 *            cube().right())
 * ```
 * :::
 *
 **/

export const difference = (...shapes) => {
  switch (shapes.length) {
    case 0: {
      return fromGeometry({ assembly: [] });
    }
    case 1: {
      return shapes[0];
    }
    default: {
      return fromGeometry(differenceGeometry(...shapes.map(toGeometry)));
    }
  }
};

const method = function (...shapes) { return difference(this, ...shapes); };

Shape.prototype.difference = method;
