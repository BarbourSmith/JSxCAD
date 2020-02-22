import { equals, splitLineSegmentByPlane } from './jsxcad-math-plane.js';
import { squaredDistance, max, min } from './jsxcad-math-vec3.js';
import { toPlane } from './jsxcad-math-poly3.js';
import { toPolygons, fromPolygons as fromPolygons$1, alignVertices, createNormalize3 as createNormalize3$1 } from './jsxcad-geometry-solid.js';
import { createNormalize3 } from './jsxcad-algorithm-quantize.js';
import { makeConvex } from './jsxcad-geometry-surface.js';
import { doesNotOverlap, measureBoundingBox, flip } from './jsxcad-geometry-polygons.js';

const EPSILON = 1e-5;
const EPSILON2 = 1e-10;

const COPLANAR = 0; // Neither front nor back.
const FRONT = 1;
const BACK = 2;
const SPANNING = 3; // Both front and back.

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// const toType = (plane, point) => {
//   // const t = planeDistance(plane, point);
//   const t = plane[0] * point[0] + plane[1] * point[1] + plane[2] * point[2] - plane[3];
//   if (t < -EPSILON) {
//     return BACK;
//   } else if (t > EPSILON) {
//     return FRONT;
//   } else {
//     return COPLANAR;
//   }
// };

const pointType = [];

const splitPolygon = (normalize, plane, polygon, back, abutting, overlapping, front) => {
  /*
    // This slows things down on average, probably due to not having the bounding sphere computed.
    // Check for non-intersection due to distance from the plane.
    const [center, radius] = measureBoundingSphere(polygon);
    let distance = planeDistance(plane, center) + EPSILON;
    if (distance > radius) {
      front.push(polygon);
      return;
    } else if (distance < -radius) {
      back.push(polygon);
      return;
    }
  */
  let polygonType = COPLANAR;
  const polygonPlane = toPlane(polygon);
  if (polygonPlane === undefined) {
    // Degenerate polygon
    return;
  }
  if (!equals(polygonPlane, plane)) {
    for (let nth = 0; nth < polygon.length; nth++) {
      // const type = toType(plane, polygon[nth]);
      // const t = planeDistance(plane, point);
      const point = polygon[nth];
      const t = plane[0] * point[0] + plane[1] * point[1] + plane[2] * point[2] - plane[3];
      if (t < -EPSILON) {
        polygonType |= BACK;
        pointType[nth] = BACK;
      } else if (t > EPSILON) {
        polygonType |= FRONT;
        pointType[nth] = FRONT;
      } else {
        polygonType |= COPLANAR;
        pointType[nth] = COPLANAR;
      }
    }
  }

  // Put the polygon in the correct list, splitting it when necessary.
  switch (polygonType) {
    case COPLANAR:
      if (dot(plane, polygonPlane) > 0) {
        // The plane and the polygon face the same way, so the spaces overlap.
        overlapping.push(polygon);
      } else {
        // The plane and the polygon face the opposite directions, so the spaces abut.
        abutting.push(polygon);
      }
      return;
    case FRONT:
      front.push(polygon);
      return;
    case BACK:
      back.push(polygon);
      return;
    case SPANNING: {
      const frontPoints = [];
      let lastFront;
      const backPoints = [];
      let lastBack;
      const last = polygon.length - 1;
      let startPoint = polygon[last];
      let startType = pointType[last];
      for (let nth = 0; nth < polygon.length; nth++) {
        const endPoint = polygon[nth];
        const endType = pointType[nth];
        if (startType !== BACK) {
          // The inequality is important as it includes COPLANAR points.
          if (lastFront === undefined || squaredDistance(startPoint, lastFront) > EPSILON2) {
            lastFront = startPoint;
            frontPoints.push(startPoint);
          }
        }
        if (startType !== FRONT) {
          // The inequality is important as it includes COPLANAR points.
          if (lastBack === undefined || squaredDistance(startPoint, lastBack) > EPSILON2) {
            lastBack = startPoint;
            backPoints.push(startPoint);
          }
        }
        if ((startType | endType) === SPANNING) {
          // This should exclude COPLANAR points.
          // Compute the point that touches the splitting plane.
          // const spanPoint = splitLineSegmentByPlane(plane, ...[startPoint, endPoint].sort());
          const spanPoint = splitLineSegmentByPlane(plane, startPoint, endPoint);
          if (lastFront === undefined || squaredDistance(spanPoint, lastFront) > EPSILON2) {
            lastFront = spanPoint;
            frontPoints.push(spanPoint);
          }
          if (lastBack === undefined || squaredDistance(spanPoint, lastBack) > EPSILON2) {
            lastBack = spanPoint;
            backPoints.push(spanPoint);
          }
        }
        startPoint = endPoint;
        startType = endType;
      }
      if (frontPoints.length >= 3) {
        while (squaredDistance(frontPoints[0], lastFront) <= EPSILON2) {
          frontPoints.pop();
          lastFront = frontPoints[frontPoints.length - 1];
        }
      }
      if (frontPoints.length >= 3) {
        frontPoints.plane = polygonPlane;
        if (backPoints.length >= 3) {
          frontPoints.parent = polygon;
          frontPoints.sibling = backPoints;
        }
        front.push(frontPoints);
      }
      if (backPoints.length >= 3) {
        while (squaredDistance(backPoints[0], lastBack) <= EPSILON2) {
          backPoints.pop();
          lastBack = backPoints[backPoints.length - 1];
        }
      }
      if (backPoints.length >= 3) {
        backPoints.plane = polygonPlane;
        if (frontPoints.length >= 3) {
          backPoints.parent = polygon;
          backPoints.sibling = frontPoints;
        }
        back.push(backPoints);
      }
      break;
    }
  }
};

const BRANCH = 0;
const IN_LEAF = 1;
const OUT_LEAF = 2;

const X = 0;
const Y = 1;
const Z = 2;

const inLeaf = {
  plane: null,
  same: [],
  kind: IN_LEAF,
  back: null,
  front: null
};

const outLeaf = {
  plane: null,
  same: [],
  kind: OUT_LEAF,
  back: null,
  front: null
};

const fromBoundingBoxes = ([aMin, aMax], [bMin, bMax], front = outLeaf, back = inLeaf) => {
  const cMin = max(aMin, bMin);
  const cMax = min(aMax, bMax);
  const bsp = {
    // Bottom
    kind: BRANCH,
    plane: [0, 0, -1, -cMin[Z] + EPSILON * 10],
    front,
    back: {
      // Top
      kind: BRANCH,
      plane: [0, 0, 1, cMax[Z] + EPSILON * 10],
      front,
      back: {
        // Left
        kind: BRANCH,
        plane: [-1, 0, 0, -cMin[X] + EPSILON * 10],
        front,
        back: {
          // Right
          kind: BRANCH,
          plane: [1, 0, 0, cMax[X] + EPSILON * 10],
          front,
          back: {
            // Back
            kind: BRANCH,
            plane: [0, -1, 0, -cMin[Y] + EPSILON * 10],
            front,
            back: {
              // Front
              kind: BRANCH,
              plane: [0, 1, 0, cMax[Y] + EPSILON * 10],
              front: outLeaf,
              back
            }
          }
        }
      }
    }
  };
  return bsp;
};

const fromPolygons = (polygons, normalize) => {
  if (polygons.length === 0) {
    // Everything is outside of an empty geometry.
    return outLeaf;
  }
  let same = [];
  let front = [];
  let back = [];
  let plane = toPlane(polygons[polygons.length >> 1]);

  for (const polygon of polygons) {
    if (toPlane([...polygon]) === undefined) {
      continue;
    }
    splitPolygon(normalize,
                 plane,
                 polygon,
                 /* back= */back,
                 /* abutting= */back,
                 /* overlapping= */same,
                 /* front= */front);
  }

  const bsp = {
    back: back.length === 0 ? inLeaf : fromPolygons(back, normalize),
    front: front.length === 0 ? outLeaf : fromPolygons(front, normalize),
    kind: BRANCH,
    plane,
    same
  };

  return bsp;
};

const fromSolid = (solid, normalize) => {
  const polygons = [];
  for (const surface of solid) {
    polygons.push(...surface);
  }
  return fromPolygons(polygons, normalize);
};

const keepIn = (polygons) => {
  for (const polygon of polygons) {
    polygon.leaf = inLeaf;
  }
  return polygons;
};

const keepOut = (polygons) => {
  for (const polygon of polygons) {
    polygon.leaf = outLeaf;
  }
  return polygons;
};

// Merge the result of a split.
const merge = (front, back) => {
  const merged = [];
  const scan = (polygons) => {
    for (const polygon of polygons) {
      if (polygon.leaf) {
        if (polygon.sibling && polygon.sibling.leaf === polygon.leaf) {
          polygon.parent.leaf = polygon.leaf;
          polygon.leaf = null;
          polygon.sibling.leaf = undefined;
          merged.push(polygon.parent);
        } else {
          merged.push(polygon);
        }
      }
    }
  };
  scan(front);
  scan(back);
  return merged;
};

const clean = (polygons) => {
  for (const polygon of polygons) {
    delete polygon.parent;
    delete polygon.sibling;
  }
  return polygons;
};

const removeInteriorPolygonsForUnionKeepingOverlap = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return [];
  } else if (bsp === outLeaf) {
    return keepOut(polygons);
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */back,
                   /* overlapping= */front,
                   /* front= */front);
    }
    const trimmedFront = removeInteriorPolygonsForUnionKeepingOverlap(bsp.front, front, normalize);
    const trimmedBack = removeInteriorPolygonsForUnionKeepingOverlap(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeInteriorPolygonsForUnionDroppingOverlap = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return [];
  } else if (bsp === outLeaf) {
    return keepOut(polygons);
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */back,
                   /* overlapping= */back,
                   /* front= */front);
    }
    const trimmedFront = removeInteriorPolygonsForUnionDroppingOverlap(bsp.front, front, normalize);
    const trimmedBack = removeInteriorPolygonsForUnionDroppingOverlap(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygonsForSection = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return keepIn(polygons);
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */front,
                   /* overlapping= */back,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygonsForSection(bsp.front, front, normalize);
    const trimmedBack = removeExteriorPolygonsForSection(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygonsForCutDroppingOverlap = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return keepIn(polygons);
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */front,
                   /* overlapping= */front,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygonsForCutDroppingOverlap(bsp.front, front, normalize);
    const trimmedBack = removeExteriorPolygonsForCutDroppingOverlap(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygonsForCutKeepingOverlap = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return keepIn(polygons);
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */front,
                   /* overlapping= */back,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygonsForCutKeepingOverlap(bsp.front, front, normalize);
    const trimmedBack = removeExteriorPolygonsForCutKeepingOverlap(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeInteriorPolygonsForDifference = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return [];
  } else if (bsp === outLeaf) {
    return keepOut(polygons);
  } else {
    const outward = [];
    const inward = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */inward,
                   /* abutting= */outward, // keepward
                   /* overlapping= */inward, // dropward
                   /* front= */outward);
    }
    const trimmedFront = removeInteriorPolygonsForDifference(bsp.front, outward, normalize);
    const trimmedBack = removeInteriorPolygonsForDifference(bsp.back, inward, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygonsForDifference = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return keepIn(polygons);
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const outward = [];
    const inward = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */inward,
                   /* abutting= */inward, // dropward
                   /* overlapping= */outward, // dropward
                   /* front= */outward);
    }
    const trimmedFront = removeExteriorPolygonsForDifference(bsp.front, outward, normalize);
    const trimmedBack = removeExteriorPolygonsForDifference(bsp.back, inward, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygonsForIntersectionKeepingOverlap = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return keepIn(polygons);
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */front,
                   /* overlapping= */back,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygonsForIntersectionKeepingOverlap(bsp.front, front, normalize);
    const trimmedBack = removeExteriorPolygonsForIntersectionKeepingOverlap(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygonsForIntersectionDroppingOverlap = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return keepIn(polygons);
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */front,
                   /* overlapping= */front,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygonsForIntersectionDroppingOverlap(bsp.front, front, normalize);
    const trimmedBack = removeExteriorPolygonsForIntersectionDroppingOverlap(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return merge(trimmedFront, trimmedBack);
    }
  }
};

// Don't merge the fragments for this one.
const dividePolygons = (bsp, polygons, normalize) => {
  if (bsp === inLeaf) {
    return polygons;
  } else if (bsp === outLeaf) {
    return polygons;
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* abutting= */front,
                   /* overlapping= */back,
                   /* front= */front);
    }
    const trimmedFront = dividePolygons(bsp.front, front, normalize);
    const trimmedBack = dividePolygons(bsp.back, back, normalize);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return [].concat(trimmedFront, trimmedBack);
    }
  }
};

const separatePolygonsForBoundPolygons = (bsp, polygons, normalize) => {
  if (polygons.length === 0) {
    return [];
  } else if (bsp === inLeaf) {
    return keepIn(polygons);
  } else if (bsp === outLeaf) {
    return keepOut(polygons);
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(normalize,
                   bsp.plane,
                   polygons[i],
                   /* back= */back, // toward keepIn
                   /* abutting= */front, // toward keepOut
                   /* overlapping= */back, // toward keepIn
                   /* front= */front); // toward keepOut
    }
    const trimmedFront = separatePolygonsForBoundPolygons(bsp.front, front, normalize);
    const trimmedBack = separatePolygonsForBoundPolygons(bsp.back, back, normalize);

    return [...trimmedFront, ...trimmedBack];
  }
};

const boundPolygons = (bsp, polygons, normalize) => {
  const inPolygons = [];
  const outPolygons = [];
  for (const polygon of separatePolygonsForBoundPolygons(bsp, polygons, normalize)) {
    if (polygon.leaf === inLeaf) {
      inPolygons.push(polygon);
    } else if (polygon.leaf === outLeaf) {
      outPolygons.push(polygon);
    }
  }
  return [clean(inPolygons), clean(outPolygons)];
};

const cut = (solid, surface, normalize = createNormalize3()) => {
  // Build a classifier from the planar polygon.
  const cutBsp = fromPolygons(surface, normalize);
  const solidPolygons = toPolygons({}, solid);

  // Classify the solid with it.
  const trimmedSolid = removeExteriorPolygonsForCutDroppingOverlap(cutBsp, solidPolygons, normalize);

  // The solid will have holes that need to be patched with the parts of the
  // planar polygon that are on the solid boundary.
  const solidBsp = fromPolygons(solidPolygons, normalize);
  const trimmedPolygons = removeExteriorPolygonsForCutKeepingOverlap(solidBsp, surface, normalize);

  return fromPolygons$1({}, [...trimmedSolid, ...trimmedPolygons]);
};

const cutOpen = (solid, surface, normalize = createNormalize3()) => {
  // Build a classifier from the planar polygon.
  const cutBsp = fromPolygons(surface, normalize);
  const solidPolygons = toPolygons({}, solid);

  // Classify the solid with it.
  const trimmedSolid = removeExteriorPolygonsForCutDroppingOverlap(cutBsp, solidPolygons, normalize);

  return fromPolygons$1({}, trimmedSolid);
};

const containsPoint = (bsp, point, history = []) => {
  while (true) {
    history.push(bsp);
    if (bsp === inLeaf) {
      return true;
    } else if (bsp === outLeaf) {
      return false;
    } else {
      const plane = bsp.plane;
      // const t = planeDistance(plane, point);
      const t = plane[0] * point[0] + plane[1] * point[1] + plane[2] * point[2] - plane[3];
      if (t <= 0) {
        // Consider points on the surface to be contained.
        bsp = bsp.back;
      } else {
        bsp = bsp.front;
      }
    }
  }
};

const X$1 = 0;
const Y$1 = 1;
const Z$1 = 2;

const walkX = (min, max, resolution) => {
  if (min[X$1] + resolution > max[X$1]) {
    return inLeaf;
  }
  const midX = (min[X$1] + max[X$1]) / 2;
  return {
    back: walkY(min, [midX, max[Y$1], max[Z$1]], resolution),
    front: walkY([midX, min[Y$1], min[Z$1]], max, resolution),
    kind: BRANCH,
    plane: [1, 0, 0, midX],
    same: []
  };
};

const walkY = (min, max, resolution) => {
  if (min[Y$1] + resolution > max[Y$1]) {
    return inLeaf;
  }
  const midY = (min[Y$1] + max[Y$1]) / 2;
  return {
    back: walkZ(min, [max[X$1], midY, max[Z$1]], resolution),
    front: walkZ([min[X$1], midY, min[Z$1]], max, resolution),
    kind: BRANCH,
    plane: [0, 1, 0, midY],
    same: []
  };
};

const walkZ = (min, max, resolution) => {
  if (min[Z$1] + resolution > max[Z$1]) {
    return inLeaf;
  }
  const midZ = (min[Z$1] + max[Z$1]) / 2;
  return {
    back: walkX(min, [max[X$1], max[Y$1], midZ], resolution),
    front: walkX([min[X$1], min[Y$1], midZ], max, resolution),
    kind: BRANCH,
    plane: [0, 0, 1, midZ],
    same: []
  };
};

const deform = (solid, transform, min, max, resolution) => {
  const normalize = createNormalize3();

  const solidPolygons = toPolygons({}, alignVertices(solid));

  const bsp = walkX(min, max, resolution);

  // Classify the solid with it.
  const dividedPolygons = [];

  for (const polygon of dividePolygons(bsp, solidPolygons, normalize)) {
    if (polygon.length > 3) {
      for (const triangle of makeConvex([polygon])) {
        dividedPolygons.push(triangle);
      }
    } else if (polygon.length === 3) {
      dividedPolygons.push(polygon);
    }
  }

  const realignedPolygons = alignVertices([dividedPolygons])[0];

  const vertices = new Map();

  for (const path of realignedPolygons) {
    for (const point of path) {
      const tag = JSON.stringify(point);
      if (!vertices.has(tag)) {
        vertices.set(tag, transform(point));
      }
    }
  }

  // Now the solid should have vertexes at the given heights, and we can apply the transform.
  const transformedPolygons = realignedPolygons.map(path => path.map(point => vertices.get(JSON.stringify(point))));

  return fromPolygons$1({}, transformedPolygons);
};

const MIN = 0;

const difference = (aSolid, ...bSolids) => {
  if (bSolids.length === 0) {
    return aSolid;
  }

  const normalize = createNormalize3$1();
  let a = toPolygons({}, alignVertices(aSolid, normalize));
  let bs = bSolids
      .map(b => toPolygons({}, alignVertices(b, normalize)))
      .filter(b => !doesNotOverlap(a, b));

  if (bs.length === 0) {
    return aSolid;
  }

  while (bs.length > 0) {
    const b = bs.shift();

    const aBB = measureBoundingBox(a);
    const bBB = measureBoundingBox(b);
    const bbBsp = fromBoundingBoxes(aBB, bBB, outLeaf, inLeaf);

    const aPolygons = a;
    const [aIn, aOut] = boundPolygons(bbBsp, aPolygons, normalize);
    const aBsp = fromBoundingBoxes(aBB, bBB, outLeaf, fromPolygons(aIn, normalize));

    const bPolygons = b;
    const [bIn] = boundPolygons(bbBsp, bPolygons, normalize);
    const bBsp = fromBoundingBoxes(aBB, bBB, outLeaf, fromPolygons(bIn, normalize));

    if (aIn.length === 0) {
      const bbMin = max(aBB[MIN], bBB[MIN]);
      // There are two ways for aIn to be empty: the space is fully enclosed or fully vacated.
      const aBsp = fromPolygons(a, normalize);
      if (containsPoint(aBsp, bbMin)) {
        // The space is fully enclosed; invert b.
        a = [...aOut, ...flip(bIn)];
      } else {
        // The space is fully vacated; nothing to be cut.
        continue;
      }
    } else if (bIn.length === 0) {
      const bbMin = max(aBB[MIN], bBB[MIN]);
      // There are two ways for bIn to be empty: the space is fully enclosed or fully vacated.
      const bBsp = fromPolygons(b, normalize);
      if (containsPoint(bBsp, bbMin)) {
        // The space is fully enclosed; only the out region remains.
        a = aOut;
      } else {
        // The space is fully vacated; nothing to cut with.
        continue;
      }
    } else {
      const aTrimmed = removeInteriorPolygonsForDifference(bBsp, aIn, normalize);
      const bTrimmed = removeExteriorPolygonsForDifference(aBsp, bIn, normalize);

      a = clean([...aOut, ...aTrimmed, ...flip(bTrimmed)]);
    }
  }
  return fromPolygons$1({}, a, normalize);
};

const MIN$1 = 0;

// An asymmetric binary merge.
const intersection = (...solids) => {
  if (solids.length === 0) {
    return [];
  }
  if (solids.length === 1) {
    return solids[0];
  }
  const normalize = createNormalize3$1();
  const s = solids.map(solid => toPolygons({}, alignVertices(solid, normalize)));
  while (s.length > 1) {
    const a = s.shift();
    const b = s.shift();

    if (doesNotOverlap(a, b)) {
      return [];
    }

    const aBB = measureBoundingBox(a);
    const bBB = measureBoundingBox(b);
    const bbBsp = fromBoundingBoxes(aBB, bBB, outLeaf, inLeaf);

    const aPolygons = a;
    const [aIn] = boundPolygons(bbBsp, aPolygons, normalize);
    const aBsp = fromBoundingBoxes(aBB, bBB, inLeaf, fromPolygons(aIn, normalize));

    const bPolygons = b;
    const [bIn] = boundPolygons(bbBsp, bPolygons, normalize);
    const bBsp = fromBoundingBoxes(aBB, bBB, inLeaf, fromPolygons(bIn, normalize));

    if (aIn.length === 0) {
      const bbMin = max(aBB[MIN$1], bBB[MIN$1]);
      // There are two ways for aIn to be empty: the space is fully exclosed or fully vacated.
      const aBsp = fromPolygons(a, normalize);
      if (containsPoint(aBsp, bbMin)) {
        // The space is fully enclosed.
        s.push(bIn);
      } else {
        // The space is fully vacated.
        return [];
      }
    } else if (bIn.length === 0) {
      const bbMin = max(aBB[MIN$1], bBB[MIN$1]);
      // There are two ways for bIn to be empty: the space is fully exclosed or fully vacated.
      const bBsp = fromPolygons(b, normalize);
      if (containsPoint(bBsp, bbMin)) {
        // The space is fully enclosed.
        s.push(aIn);
      } else {
        // The space is fully vacated.
        return [];
      }
    } else {
      const aTrimmed = removeExteriorPolygonsForIntersectionKeepingOverlap(bBsp, aIn, normalize);
      const bTrimmed = removeExteriorPolygonsForIntersectionDroppingOverlap(aBsp, bIn, normalize);

      s.push(clean([...aTrimmed, ...bTrimmed]));
    }
  }
  return fromPolygons$1({}, s[0], normalize);
};

const section = (solid, surfaces, normalize) => {
  const bsp = fromSolid(alignVertices(solid, normalize), normalize);
  return surfaces.map(surface => removeExteriorPolygonsForSection(bsp, surface, normalize));
};

const MIN$2 = 0;

// An asymmetric binary merge.
const union = (...solids) => {
  if (solids.length === 0) {
    return [];
  }
  if (solids.length === 1) {
    return solids[0];
  }
  const normalize = createNormalize3$1();
  const s = solids.map(solid => toPolygons({}, alignVertices(solid, normalize)));
  while (s.length >= 2) {
    const a = s.shift();
    const b = s.shift();

    if (doesNotOverlap(a, b)) {
      s.push([...a, ...b]);
      continue;
    }

    const aBB = measureBoundingBox(a);
    const bBB = measureBoundingBox(b);
    const bbBsp = fromBoundingBoxes(aBB, bBB, outLeaf, inLeaf);

    const aPolygons = a;
    const [aIn, aOut] = boundPolygons(bbBsp, aPolygons, normalize);
    const aBsp = fromBoundingBoxes(aBB, bBB, outLeaf, fromPolygons(aIn, normalize));

    const bPolygons = b;
    const [bIn, bOut] = boundPolygons(bbBsp, bPolygons, normalize);
    const bBsp = fromBoundingBoxes(aBB, bBB, outLeaf, fromPolygons(bIn, normalize));

    if (aIn.length === 0) {
      const bbMin = max(aBB[MIN$2], bBB[MIN$2]);
      // There are two ways for aIn to be empty: the space is fully enclosed or fully vacated.
      const aBsp = fromPolygons(a, normalize);
      if (containsPoint(aBsp, bbMin)) {
        // The space is fully enclosed; bIn is redundant.
        s.push([...aOut, ...aIn, ...bOut]);
      } else {
        s.push([...aOut, ...aIn, ...bOut]);
        // The space is fully vacated; nothing overlaps b.
        s.push([...a, ...b]);
      }
    } else if (bIn.length === 0) {
      const bbMin = max(aBB[MIN$2], bBB[MIN$2]);
      // There are two ways for bIn to be empty: the space is fully enclosed or fully vacated.
      const bBsp = fromPolygons(b, normalize);
      if (containsPoint(bBsp, bbMin)) {
        // The space is fully enclosed; aIn is redundant.
        s.push([...aOut, ...bIn, ...bOut]);
      } else {
        // The space is fully vacated; nothing overlaps a.
        s.push([...a, ...b]);
      }
    } else {
      const aTrimmed = removeInteriorPolygonsForUnionKeepingOverlap(bBsp, aIn, normalize);
      const bTrimmed = removeInteriorPolygonsForUnionDroppingOverlap(aBsp, bIn, normalize);

      s.push(clean([...aOut, ...bTrimmed, ...bOut, ...aTrimmed]));
    }
  }
  return fromPolygons$1({}, s[0], normalize);
};

export { containsPoint, cut, cutOpen, deform, difference, fromSolid, intersection, section, union };
