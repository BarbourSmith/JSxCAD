import { cacheTransform } from '@jsxcad/cache';
import { transform as transformPaths } from '@jsxcad/geometry-paths';
import { transform as transformPlane } from '@jsxcad/math-plane';
import { transform as transformPoints } from '@jsxcad/geometry-points';
import { transform as transformSolid } from '@jsxcad/geometry-solid';
import { transform as transformSurface } from '@jsxcad/geometry-surface';

export const transformItem = (matrix, item) => {
  const transformed = {};
  if (item.assembly) {
    transformed.assembly = item.assembly;
  } else if (item.disjointAssembly) {
    transformed.disjointAssembly = item.disjointAssembly;
  } else if (item.item) {
    transformed.item = item.item;
  } else if (item.paths) {
    transformed.paths = transformPaths(matrix, item.paths);
  } else if (item.plan) {
    transformed.plan = item.plan;
    transformed.marks = transformPoints(matrix, item.marks);
    transformed.planes = item.planes.map(plane => transformPlane(matrix, plane));
    transformed.visualization = transformItem(matrix, item.visualization);
  } else if (item.points) {
    transformed.points = transformPoints(matrix, item.points);
  } else if (item.solid) {
    transformed.solid = transformSolid(matrix, item.solid);
  } else if (item.surface) {
    transformed.surface = transformSurface(matrix, item.surface);
  } else if (item.z0Surface) {
    // FIX: Consider transforms that preserve z0.
    transformed.surface = transformSurface(matrix, item.z0Surface);
  } else if (item.empty) {
    transformed.empty = true;
  } else {
    throw Error(`die: ${JSON.stringify(item)}`);
  }
  transformed.tags = item.tags;
  return transformed;
};

const transformImpl = (matrix, untransformed) => {
  if (matrix.some(value => typeof value !== 'number' || isNaN(value))) {
    throw Error('die');
  }
  return { matrix, untransformed, tags: untransformed.tags };
};

export const transform = cacheTransform(transformImpl);
