import {
  fromSolid as fromSolidToBsp,
  intersectSurface,
  union as solidUnion,
} from '@jsxcad/geometry-bsp';
import {
  makeWatertight as makeWatertightSurface,
  toPlane as toPlaneFromSurface,
} from '@jsxcad/geometry-surface';

import { cache } from '@jsxcad/cache';
import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import { fromSurface as fromSurfaceToSolid } from '@jsxcad/geometry-solid';
import { getAnyNonVoidSurfaces } from './getAnyNonVoidSurfaces.js';
import { getNonVoidPaths } from './getNonVoidPaths.js';
import { getNonVoidPoints } from './getNonVoidPoints.js';
import { getNonVoidSolids } from './getNonVoidSolids.js';
import { union as pathsUnion } from '@jsxcad/geometry-paths';
import { union as pointsUnion } from '@jsxcad/geometry-points';
import { rewrite } from './visit.js';
import { taggedPaths } from './taggedPaths.js';
import { taggedPoints } from './taggedPoints.js';
import { taggedSolid } from './taggedSolid.js';
import { taggedSurface } from './taggedSurface.js';
import { toPolygon as toPolygonFromPlane } from '@jsxcad/math-plane';

// Union is a little more complex, since it can violate disjointAssembly invariants.
const unionImpl = (geometry, ...geometries) => {
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'solid': {
        const solids = [];
        for (const geometry of geometries) {
          for (const { solid } of getNonVoidSolids(geometry)) {
            solids.push(solid);
          }
        }
        // No meaningful way to unify with a surface.
        return taggedSolid({ tags }, solidUnion(geometry.solid, ...solids));
      }
      case 'surface':
      case 'z0Surface': {
        const normalize = createNormalize3();
        const thisSurface = geometry.surface || geometry.z0Surface;
        let planarPolygon = toPolygonFromPlane(toPlaneFromSurface(thisSurface));
        const solids = [];
        for (const input of [geometry, ...geometries]) {
          for (const { solid } of getNonVoidSolids(input)) {
            solids.push(solid);
          }
          for (const { surface, z0Surface } of getAnyNonVoidSurfaces(input)) {
            solids.push(fromSurfaceToSolid(surface || z0Surface, normalize));
          }
        }
        const unionedSolid = solidUnion(...solids);
        const clippedPolygons = [];
        intersectSurface(
          fromSolidToBsp(unionedSolid, normalize),
          [planarPolygon],
          normalize,
          (polygons) => clippedPolygons.push(...polygons)
        );
        return taggedSurface(
          {},
          makeWatertightSurface(clippedPolygons, normalize)
        );
      }
      case 'paths': {
        const { paths, tags } = geometry;
        const pathsets = [];
        for (const { paths } of getNonVoidPaths(geometry)) {
          pathsets.push(paths);
        }
        return taggedPaths({ tags }, pathsUnion(paths, ...pathsets));
      }
      case 'points': {
        const { points, tags } = geometry;
        const pointsets = [];
        for (const { points } of getNonVoidPoints(geometry)) {
          pointsets.push(points);
        }
        return taggedPoints({ tags }, pointsUnion(points, ...pointsets));
      }
      case 'plan':
      case 'assembly':
      case 'item':
      case 'disjointAssembly':
      case 'layers': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for union.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(geometry, op);
};

export const union = cache(unionImpl);
