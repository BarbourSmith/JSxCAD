import { equals } from '@jsxcad/math-vec3';
import { getCgal } from './getCgal.js';

export const fromSurfaceMeshToGraph = (mesh) => {
  const c = getCgal();
  if (mesh.has_garbage()) {
    c.Surface_mesh__collect_garbage(mesh);
  }
  const graph = {
    edges: [],
    points: [],
    exactPoints: [],
    faces: [],
    facets: [],
  };
  c.Surface_mesh__explore(
    mesh,
    (point, x, y, z, exactX, exactY, exactZ) => {
      if (!isFinite(x) || !isFinite(y) || !isFinite(z)) {
        throw Error('die');
      }
      if (graph.points[point]) {
        if (!equals(graph.points[point], [x, y, z])) {
          throw Error('die');
        }
      }
      graph.points[point] = [x, y, z];
      graph.exactPoints[point] = [exactX, exactY, exactZ];
    },
    (edge, point, next, twin, facet, face) => {
      graph.edges[edge] = { point, next, twin, facet, face };
      graph.facets[facet] = { edge };
    },
    (face, x, y, z, w, exactX, exactY, exactZ, exactW) => {
      if (x === 0 && y === 0 && z === 0 && w === 0) {
        throw Error(`Zero plane`);
      }
      graph.faces[face] = {
        plane: [x, y, z, w],
        exactPlane: [exactX, exactY, exactZ, exactW],
      };
    }
  );
  graph.isClosed = c.Surface_mesh__is_closed(mesh);
  if (graph.edges.length === 0) {
    graph.isEmpty = true;
  }
  return graph;
};
