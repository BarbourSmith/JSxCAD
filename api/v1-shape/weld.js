import {
  arrangePolygonsWithHoles,
  fromPolygonsWithHolesToTriangles,
  fromTrianglesToGraph,
  taggedGraph,
  taggedGroup,
  toPolygonsWithHoles,
} from '@jsxcad/geometry';

import Shape from './Shape.js';

export const weld = (...shapes) => {
  const unwelded = [];
  for (const shape of shapes) {
    // We lose the tags at this point.
    const result = toPolygonsWithHoles(shape.toGeometry());
    for (const { polygonsWithHoles } of result) {
      unwelded.push(...polygonsWithHoles);
    }
  }
  const welds = [];
  const arrangements = arrangePolygonsWithHoles(unwelded);
  console.log(`QQ/arrangements: ${JSON.stringify(arrangements)}`);
  for (const { polygonsWithHoles } of arrangements) {
    // Keep the planar grouping.
    const triangles = fromPolygonsWithHolesToTriangles(polygonsWithHoles);
    const graph = fromTrianglesToGraph(triangles);
    welds.push(taggedGraph({}, graph));
  }
  // A group of planar welds.
  return Shape.fromGeometry(taggedGroup({}, ...welds));
};

const weldMethod = function (...shapes) {
  return weld(this, ...shapes);
};

Shape.prototype.weld = weldMethod;
