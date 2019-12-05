import { Shape, fromGeometry, toGeometry } from './Shape';
import { assertEmpty, assertShape, assertStrings } from './assert';
import { nonNegative, rewriteTags } from '@jsxcad/geometry-tagged';

import { dispatch } from './dispatch';

/**
 *
 * # Mark an object as not to cut holes.
 *
 **/

export const fromValue = (tags, shape) => fromGeometry(nonNegative(tags, toGeometry(shape)));

export const nocut = dispatch(
  'nocut',
  (tags, shape) => {
    // assemble(circle(), circle().nocut())
    assertEmpty(tags);
    assertShape(shape);
    return () => fromGeometry(rewriteTags(['compose/non-negative'], [], toGeometry(shape)));
  },
  (tags, shape) => {
    assertStrings(tags);
    assertShape(shape);
    return () => fromValue(tags.map(tag => `user/${tag}`), shape);
  }
);

nocut.fromValues = fromValue;

const method = function (...tags) { return nocut(tags, this); };

Shape.prototype.nocut = method;
