import {
  fromSolid as fromSolidToBsp,
  fromSurface as fromSurfaceToBsp,
  intersectSurface,
} from '@jsxcad/geometry-bsp';
import {
  toPlane as fromSurfaceToPlane,
  makeWatertight as makeWatertightSurface,
} from '@jsxcad/geometry-surface';

import { cache } from '@jsxcad/cache';
import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import { toPolygon as fromPlaneToPolygon } from '@jsxcad/math-plane';
import { getAnyNonVoidSurfaces } from './getAnyNonVoidSurfaces.js';
import { getNonVoidPaths } from './getNonVoidPaths.js';
import { getNonVoidPoints } from './getNonVoidPoints.js';
import { getNonVoidSolids } from './getNonVoidSolids.js';
import { getSurfaces } from './getSurfaces.js';
import { union as pathsUnion } from '@jsxcad/geometry-paths';
import { union as pointsUnion } from '@jsxcad/geometry-points';
import { rewrite } from './visit.js';
import { union as solidUnion } from '@jsxcad/geometry-solid-boolean';
import { taggedAssembly } from './taggedAssembly.js';
import { taggedDisjointAssembly } from './taggedDisjointAssembly.js';
import { taggedPaths } from './taggedPaths.js';
import { taggedPoints } from './taggedPoints.js';
import { taggedSolid } from './taggedSolid.js';
import { taggedSurface } from './taggedSurface.js';
import { toDisjointGeometry } from './toDisjointGeometry.js';

// Union is a little more complex, since it can violate disjointAssembly invariants.
const unionImpl = (geometry, ...geometries) => {
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'solid': {
        const todo = [];
        for (const geometry of geometries) {
          for (const { solid } of getNonVoidSolids(geometry)) {
            todo.push(solid);
          }
        }
        // No meaningful way to unify with a surface.
        return taggedSolid({ tags }, solidUnion(geometry.solid, ...todo));
      }
      case 'z0Surface':
      case 'surface' /*
      {
        // FIX: This has a problem with trying to union with an empty surface.
        const normalize = createNormalize3();
        const thisSurface = geometry.surface || geometry.z0Surface;
        let planarPolygon = fromPlaneToPolygon(fromSurfaceToPlane(thisSurface));
        let bsp = fromSurfaceToBsp(thisSurface, normalize);
        for (const geometry of geometries) {
          for (const { solid } of getNonVoidSolids(geometry)) {
            bsp = unifyBspTrees(fromSolidToBsp(solid, normalize), bsp);
          }
          for (const { surface, z0Surface } of getAnyNonVoidSurfaces(
            geometry
          )) {
            bsp = unifyBspTrees(
              fromSurfaceToBsp(surface || z0Surface, normalize),
              bsp
            );
          }
        }
        const clippedSurface = [];
        intersectSurface(bsp, [planarPolygon], normalize, (surface) =>
          clippedSurface.push(...surface)
        );
        return taggedSurface({ tags }, makeWatertightSurface(clippedSurface));
      }
*/: {
        const normalize = createNormalize3();
        const thisSurface = geometry.surface || geometry.z0Surface;
        let planarPolygon = fromPlaneToPolygon(fromSurfaceToPlane(thisSurface));
        // Cut the plane into pieces and assemble into a surface.
        let clippedSurfaces = [];
        for (const input of [geometry, ...geometries]) {
          for (const { solid } of getNonVoidSolids(input)) {
            const clippedPolygons = [];
            intersectSurface(
              fromSolidToBsp(solid, normalize),
              [planarPolygon],
              normalize,
              (polygons) => clippedPolygons.push(...polygons)
            );
            clippedSurfaces.push(
              taggedSurface({}, makeWatertightSurface(clippedPolygons))
            );
          }
          for (const { surface, z0Surface } of getAnyNonVoidSurfaces(input)) {
            const clippedPolygons = [];
            intersectSurface(
              fromSurfaceToBsp(surface || z0Surface, normalize),
              [planarPolygon],
              normalize,
              (polygons) => clippedPolygons.push(...polygons)
            );
            clippedSurfaces.push(
              taggedSurface({}, makeWatertightSurface(clippedPolygons))
            );
          }
        }
        if (clippedSurfaces.length === 0) {
          return taggedDisjointAssembly({});
        } else if (clippedSurfaces.length === 1) {
          return clippedSurfaces[0];
        } else {
          const mergedSurface = [];
          for (const { surface } of getSurfaces(
            toDisjointGeometry(taggedAssembly({}, ...clippedSurfaces))
          )) {
            // These are disjoint and coplanar, so we can merge them into a single surface.
            mergedSurface.push(...surface);
          }
          return taggedSurface({}, makeWatertightSurface(mergedSurface));
        }
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
