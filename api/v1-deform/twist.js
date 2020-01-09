import Shape from '@jsxcad/api-v1-shape';
import { deform } from '@jsxcad/algorithm-bsp-surfaces';
import { getSolids } from '@jsxcad/geometry-tagged';
import { measureBoundingBox } from '@jsxcad/geometry-solid';
import { rotateZ } from '@jsxcad/math-vec3';

const Z = 2;

export const twist = (shape, angle = 0, { resolution = 1 } = {}) => {
  const radians = angle * Math.PI / 180;
  const rotate = point => rotateZ(point, radians * point[Z]);

  const assembly = [];
  for (const { solid, tags } of getSolids(shape.toKeptGeometry())) {
    const [min, max] = measureBoundingBox(solid);
    assembly.push({ solid: deform(solid, rotate, min, max, resolution), tags });
  }

  return Shape.fromGeometry({ assembly });
};

const twistMethod = function (...args) { return twist(this, ...args); };
Shape.prototype.twist = twistMethod;

export default twist;