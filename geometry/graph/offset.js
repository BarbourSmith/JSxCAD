import { fromPaths } from './fromPaths.js';
import { fromPolygonWithHolesToPaths } from './fromPolygonWithHolesToPaths.js';
import { offsetOfPolygonWithHoles } from '@jsxcad/algorithm-cgal';
import { outline } from './outline.js';

export const offset = (graph, initial, step, limit) => {
  const offsetGraphs = [];
  for (const polygonWithHoles of outline(graph)) {
    for (const offsetPolygon of offsetOfPolygonWithHoles(
      initial,
      step,
      limit,
      polygonWithHoles
    )) {
      offsetGraphs.push(fromPaths(fromPolygonWithHolesToPaths(offsetPolygon)));
    }
  }
  return offsetGraphs;
};
