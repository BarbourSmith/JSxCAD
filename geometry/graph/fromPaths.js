import {
  addFace,
  addHoleFromPoints,
  addLoopFromPoints,
  create,
} from './graph.js';
import { arrangePaths, fitPlaneToPoints } from '@jsxcad/algorithm-cgal';
import { deduplicate, flip, isClockwise } from '@jsxcad/geometry-path';

import { canonicalize as canonicalizePaths } from '@jsxcad/geometry-paths';
import { dot } from '@jsxcad/math-vec3';

const orientClockwise = (path) => (isClockwise(path) ? path : flip(path));
const orientCounterClockwise = (path) =>
  isClockwise(path) ? flip(path) : path;

const Z = 2;

// This imposes a planar arrangement.
export const fromPaths = (inputPaths) => {
  const paths = canonicalizePaths(inputPaths);
  const graph = create();
  const points = [];
  for (const path of paths) {
    for (const point of path) {
      if (point !== null) {
        points.push(point);
      }
    }
  }
  let plane = fitPlaneToPoints(points);
  if (plane) {
    // Orient planes up by default.
    // FIX: Remove this hack.
    if (dot(plane, [0, 0, 1, 0]) < -0.1) {
      plane[Z] *= -1;
    }
    const arrangement = arrangePaths(...plane, paths);
    for (const { points, holes } of arrangement) {
      const face = addFace(graph, { plane });
      const exterior = orientCounterClockwise(points);
      addLoopFromPoints(graph, deduplicate(exterior), { face });
      for (const hole of holes) {
        const interior = orientClockwise(hole);
        addHoleFromPoints(graph, deduplicate(interior), { face });
      }
    }
  }
  if (graph.edges.length === 0) {
    graph.isEmpty = true;
  }
  graph.isClosed = false;
  graph.isOutline = true;
  graph.isWireframe = true;
  return graph;
};