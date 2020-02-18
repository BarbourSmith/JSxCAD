import { Shape, assemble } from '@jsxcad/api-v1-shape';
import { containsPoint as containsPointAlgorithm, fromSolid } from '@jsxcad/algorithm-bsp-surfaces';
import { fromPolygons, measureBoundingBox } from '@jsxcad/geometry-solid';

import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import { getSolids } from '@jsxcad/geometry-tagged';

const X = 0;
const Y = 1;
const Z = 2;

export const voxels = (shape, resolution = 1) => {
  const offset = resolution / 2;
  const voxels = [];
  for (const { solid, tags } of getSolids(shape.toKeptGeometry())) {
    const [min, max] = measureBoundingBox(solid);
    const bsp = fromSolid(solid, createNormalize3());
    const polygons = [];
    for (let x = min[X] - offset; x <= max[X] + offset; x += resolution) {
      for (let y = min[Y] - offset; y <= max[Y] + offset; y += resolution) {
        for (let z = min[Z] - offset; z <= max[Z] + offset; z += resolution) {
          const state = containsPointAlgorithm(bsp, [x, y, z]);
          if (state !== containsPointAlgorithm(bsp, [x + resolution, y, z])) {
            const face = [[x + offset, y - offset, z - offset],
                          [x + offset, y + offset, z - offset],
                          [x + offset, y + offset, z + offset],
                          [x + offset, y - offset, z + offset]];
            polygons.push(state ? face : face.reverse());
          }
          if (state !== containsPointAlgorithm(bsp, [x, y + resolution, z])) {
            const face = [[x - offset, y + offset, z - offset],
                          [x + offset, y + offset, z - offset],
                          [x + offset, y + offset, z + offset],
                          [x - offset, y + offset, z + offset]];
            polygons.push(state ? face.reverse() : face);
          }
          if (state !== containsPointAlgorithm(bsp, [x, y, z + resolution])) {
            const face = [[x - offset, y - offset, z + offset],
                          [x + offset, y - offset, z + offset],
                          [x + offset, y + offset, z + offset],
                          [x - offset, y + offset, z + offset]];
            polygons.push(state ? face : face.reverse());
          }
        }
      }
    }
    voxels.push(Shape.fromGeometry({ solid: fromPolygons({}, polygons), tags }));
  }
  return assemble(...voxels);
};

const voxelsMethod = function (...args) { return voxels(this, ...args); };
Shape.prototype.voxels = voxelsMethod;

// FIX: move this
export const containsPoint = (shape, point) => {
  for (const { solid } of getSolids(shape.toKeptGeometry())) {
    const bsp = fromSolid(solid, createNormalize3());
    if (containsPointAlgorithm(bsp, point)) {
      return true;
    }
  }
  return false;
};

const containsPointMethod = function (point) { return containsPoint(this, point); };
Shape.prototype.containsPoint = containsPointMethod;

export default voxels;
