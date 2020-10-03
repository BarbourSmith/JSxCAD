import { getCgal } from './getCgal.js';
import { fromPolygon as fromPolygonToPlane } from '@jsxcad/math-plane';

export const fromSurfaceMeshToGraph = (mesh) => {
  const c = getCgal();
  if (mesh.has_garbage()) {
    c.Surface_mesh__collect_garbage(mesh);
  }
  const graph = { edges: [], faces: [], loops: [], points: [] };
  c.Surface_mesh__EachFace(mesh, face => {
    const halfedge = c.Surface_mesh__face_to_halfedge(mesh, face);
    graph.loops[face] = { edge: halfedge };
    const start = halfedge;
    let current = start;
    const polygon = [];
    do {
      const next = c.Surface_mesh__halfedge_to_next_halfedge(mesh, current);
      const opposite = c.Surface_mesh__halfedge_to_opposite_halfedge(mesh, current);
      const target = c.Surface_mesh__halfedge_to_target(mesh, current);
      graph.edges[current] = { point: target, next, loop: face, twin: opposite };
      if (graph.points[target] === undefined) {
        const point = c.Surface_mesh__vertex_to_point(mesh, target);
        const triple = [point.x(), point.y(), point.z()];
        graph.points[target] = triple;
      }
      polygon.push(graph.points[target]);
      current = next;
    } while (current !== start);
    graph.faces[face] = { loop: face, plane: fromPolygonToPlane(polygon) };
  });
  return graph;
}
