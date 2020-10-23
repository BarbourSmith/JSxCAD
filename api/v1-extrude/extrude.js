import Shape from '@jsxcad/api-v1-shape';
import { extrude as extrudeGeometry } from '@jsxcad/geometry-tagged';

export const extrude = (shape, height = 1, depth = 0) => {
  if (height < depth) {
    [height, depth] = [depth, height];
  }
  return Shape.fromGeometry(extrudeGeometry(shape.toGeometry(), height, depth));
};

const extrudeMethod = function (height = 1, depth = 0) {
  return extrude(this, height, depth);
};
Shape.prototype.extrude = extrudeMethod;

export default extrude;
