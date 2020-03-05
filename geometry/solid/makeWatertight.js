import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import { distance } from '@jsxcad/math-vec3';
import { equals as equalsPlane } from '@jsxcad/math-plane';
import { getEdges } from '@jsxcad/geometry-path';
import { pushWhenValid } from '@jsxcad/geometry-polygons';
import { toPlane } from '@jsxcad/math-poly3';

const THRESHOLD = 1e-5;

// We expect a solid of reconciled triangles.

const watertight = Symbol('watertight');

export const makeWatertight = (solid, normalize, onFixed = (_ => _), threshold = THRESHOLD) => {
  if (normalize === undefined) {
    normalize = createNormalize3(1 / threshold);
  }
  if (!solid[watertight]) {
    if (isWatertight(solid)) {
      solid[watertight] = solid;
    }
  }

  if (!solid[watertight]) {
    let fixed = false;
    const vertices = new Set();

    const reconciledSolid = [];
    for (const surface of solid) {
      const reconciledSurface = [];
      for (const path of surface) {
        const reconciledPath = [];
        for (const point of path) {
          const reconciledPoint = normalize(point);
          reconciledPath.push(reconciledPoint);
          vertices.add(reconciledPoint);
        }
        if (toPlane(reconciledPath) !== undefined) {
          // Filter degenerates.
          reconciledSurface.push(reconciledPath);
        }
        if (toPlane(reconciledPath) === undefined || !equalsPlane(toPlane(reconciledPath), toPlane(path))) {
          console.log(`QQ/makeWatertight/reconciled/plane: ${JSON.stringify(toPlane(reconciledPath))}`);
          console.log(`QQ/makeWatertight/path/plane: ${JSON.stringify(toPlane(path))}`);
          console.log(`QQ/makeWatertight: plane drift`);
        }
      }
      reconciledSolid.push(reconciledSurface);
    }

    const watertightSolid = [];
    for (const surface of reconciledSolid) {
      const watertightPaths = [];
      for (const path of surface) {
        const watertightPath = [];
        for (const [start, end] of getEdges(path)) {
          watertightPath.push(start);
          const span = distance(start, end);
          const colinear = [];
          for (const vertex of vertices) {
            // FIX: Threshold
            if (Math.abs(distance(start, vertex) + distance(vertex, end) - span) < threshold) {
              // if (vertex !== start && vertex !== end)
              if (!path.includes(vertex)) {
                // FIX: Clip an ear instead.
                // Vertex is on the open edge.
                colinear.push(vertex);
                fixed = true;
              }
            }
          }
          // Arrange by distance from start.
          colinear.sort((a, b) => distance(start, a) - distance(start, b));
          // Insert into the path.
          watertightPath.push(...colinear);
        }
        pushWhenValid(watertightPaths, watertightPath);
      }
      watertightSolid.push(watertightPaths);
    };

    // At this point we should have the correct structure for assembly into a solid.
    // We just need to ensure triangulation to support deformation.

    onFixed(fixed);

    solid[watertight] = watertightSolid;
  }

  return solid[watertight];
};

export const isWatertight = (solid) => {
  const edges = new Set();
  for (const surface of solid) {
    for (const path of surface) {
      for (const [start, end] of getEdges(path)) {
        edges.add(`${JSON.stringify([start, end])}`);
      }
    }
  }
  for (const surface of solid) {
    for (const path of surface) {
      for (const [start, end] of getEdges(path)) {
        if (!edges.has(`${JSON.stringify([end, start])}`)) {
          return false;
        }
      }
    }
  }
  return true;
};
