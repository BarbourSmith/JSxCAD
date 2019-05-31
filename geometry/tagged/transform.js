import { transform as transformPaths } from '@jsxcad/geometry-paths';
import { transform as transformPoints } from '@jsxcad/geometry-points';
import { transform as transformSolid } from '@jsxcad/geometry-solid';
import { transform as transformSurface } from '@jsxcad/geometry-surface';

export const transformItem = (matrix, item) => {
  const transformed = {};
  if (item.assembly) {
    transformed.assembly = item.assembly;
  }
  if (item.paths) {
    transformed.paths = transformPaths(matrix, item.paths);
  }
  if (item.points) {
    transformed.points = transformPoints(matrix, item.points);
  }
  if (item.solid) {
    transformed.solid = transformSolid(matrix, item.solid);
  }
  if (item.z0Surface) {
    // FIX: Handle transformations that take the surface out of z0.
    transformed.z0Surface = transformSurface(matrix, item.z0Surface);
  }
  transformed.tags = item.tags;
  return transformed;
};

export const transform = (matrix, untransformed) => ({ matrix, untransformed });
