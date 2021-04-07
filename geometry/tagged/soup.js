import { toPaths, toTriangles } from '@jsxcad/geometry-graph';

import { outline as outlineOp } from './outline.js';
import { rewrite } from './visit.js';
import { taggedGroup } from './taggedGroup.js';
import { taggedPaths } from './taggedPaths.js';
import { taggedTriangles } from './taggedTriangles.js';
import { toTransformedGeometry } from './toTransformedGeometry.js';

export const soup = (
  geometry,
  { doOutline = true, doWireframe = false } = {}
) => {
  const outline = doOutline ? outlineOp : () => [];
  const wireframe = doWireframe
    ? (triangles) => [taggedPaths({ tags: ['color/red'] }, triangles)]
    : () => [];
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        const { graph } = geometry;
        if (graph.isWireframe) {
          return taggedPaths({ tags }, toPaths(graph));
        } else if (graph.isClosed) {
          return taggedGroup(
            {},
            taggedTriangles({ tags }, toTriangles(graph)),
            ...wireframe(toTriangles(graph)),
            ...outline(geometry)
          );
        } else if (graph.isEmpty) {
          return taggedGroup({});
        } else {
          // FIX: Simplify this arrangement.
          return taggedGroup(
            {},
            taggedTriangles({ tags }, toTriangles(graph)),
            ...wireframe(toTriangles(graph)),
            ...outline(geometry)
          );
        }
      }
      // Unreachable.
      case 'triangles':
      case 'points':
      case 'paths':
        // Already soupy enough.
        return geometry;
      case 'displayGeometry':
        // soup can handle displayGeometry.
        return descend();
      case 'layout':
      case 'plan':
      case 'assembly':
      case 'item':
      case 'disjointAssembly':
      case 'sketch':
      case 'layers': {
        return descend();
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};
