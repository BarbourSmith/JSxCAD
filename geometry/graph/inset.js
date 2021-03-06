import { fromPolygonsWithHoles } from './fromPolygonsWithHoles.js';
import { info } from '@jsxcad/sys';
import { insetOfPolygonWithHoles } from '@jsxcad/algorithm-cgal';
import { toPolygonsWithHoles } from './toPolygonsWithHoles.js';

export const inset = (geometry, initial, step, limit) => {
  info('inset begin');
  const insetGraphs = [];
  for (const { polygonsWithHoles } of toPolygonsWithHoles(geometry)) {
    for (const polygonWithHoles of polygonsWithHoles) {
      for (const insetPolygon of insetOfPolygonWithHoles(
        initial,
        step,
        limit,
        polygonWithHoles
      )) {
        insetGraphs.push(
          fromPolygonsWithHoles({ tags: geometry.tags }, [insetPolygon])
        );
      }
    }
  }
  info('inset end');
  return insetGraphs;
};
