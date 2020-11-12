import { identityMatrix, multiply } from '@jsxcad/math-mat4';

import { rewrite } from './visit.js';
import { taggedSurface } from './taggedSurface.js';
import { transform as transformGraph } from '@jsxcad/geometry-graph';
import { transform as transformPaths } from '@jsxcad/geometry-paths';
import { transform as transformPlane } from '@jsxcad/math-plane';
import { transform as transformPoints } from '@jsxcad/geometry-points';
import { transform as transformSolid } from '@jsxcad/geometry-solid';
import { transform as transformSurface } from '@jsxcad/geometry-surface';

const transformedGeometry = Symbol('transformedGeometry');

export const toTransformedGeometry = (geometry) => {
  if (geometry[transformedGeometry] === undefined) {
    const op = (geometry, descend, walk, matrix) => {
      switch (geometry.type) {
        case 'transform':
          // Preserve any tags applied to the untransformed geometry.
          // FIX: Ensure tags are merged between transformed and untransformed upon resolution.
          return walk(geometry.content[0], multiply(matrix, geometry.matrix));
        case 'assembly':
        case 'layout':
        case 'layers':
        case 'item':
        case 'sketch':
          return descend(undefined, matrix);
        case 'disjointAssembly':
          if (matrix === identityMatrix) {
            // A disjointAssembly does not contain any untransformed geometry.
            // There is no transform, so we can stop here.
            return geometry;
          } else {
            return descend(undefined, matrix);
          }
        case 'plan':
          return descend(
            {
              marks: transformPoints(matrix, geometry.marks),
              planes: geometry.planes.map((plane) =>
                transformPlane(matrix, plane)
              ),
            },
            matrix
          );
        case 'paths':
          return descend({ paths: transformPaths(matrix, geometry.paths) });
        case 'points':
          return descend({ points: transformPoints(matrix, geometry.points) });
        case 'solid':
          return descend({ solid: transformSolid(matrix, geometry.solid) });
        case 'graph':
          return descend({ graph: transformGraph(matrix, geometry.graph) });
        case 'surface':
        case 'z0Surface': {
          const surface = geometry.z0Surface || geometry.surface;
          if (surface.length === 0) {
            // Empty geometries don't need transforming, but we'll return a
            // fresh one to avoid any caching.
            return taggedSurface({}, []);
          }
          return taggedSurface(
            { tags: geometry.tags },
            transformSurface(matrix, surface)
          );
        }
        default:
          throw Error(
            `Unexpected geometry ${geometry.type} see ${JSON.stringify(
              geometry
            )}`
          );
      }
    };
    geometry[transformedGeometry] = rewrite(geometry, op, identityMatrix);
  }
  return geometry[transformedGeometry];
};
