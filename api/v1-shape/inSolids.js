import Shape from './Shape.js';
import { rewrite } from '@jsxcad/geometry-tagged';

export const inSolids = (shape, op = (_) => _) => {
  let nth = 0;
  const rewritten = rewrite(shape.toKeptGeometry(), (geometry, descend) => {
    if (geometry.solid) {
      // Operate on the solid.
      const solid = op(Shape.fromGeometry(geometry), nth++);
      // Replace the solid with the result (which might not be a solid).
      return solid.toGeometry();
    } else {
      return descend();
    }
  });
  return Shape.fromGeometry(rewritten);
};

const inSolidsMethod = function (...args) {
  return inSolids(this, ...args);
};
Shape.prototype.inSolids = inSolidsMethod;

export default inSolids;
