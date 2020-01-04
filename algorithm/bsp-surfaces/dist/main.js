import { equals, splitLineSegmentByPlane } from './jsxcad-math-plane.js';
import { squaredDistance } from './jsxcad-math-vec3.js';
import { toPlane } from './jsxcad-math-poly3.js';
import { toPolygons, fromPolygons as fromPolygons$1, createNormalize3, alignVertices, doesNotOverlap, flip } from './jsxcad-geometry-solid.js';

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

const splitPolygon = (plane, polygon, back, coplanarBack, coplanarFront, front) => {
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
        coplanarFront.push(polygon);
      } else {
        coplanarBack.push(polygon);
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
      const backPoints = [];
      const last = polygon.length - 1;
      let startPoint = polygon[last];
      let startType = pointType[last];
      for (let nth = 0; nth < polygon.length; nth++) {
        const endPoint = polygon[nth];
        const endType = pointType[nth];
        if (startType !== BACK) {
          // The inequality is important as it includes COPLANAR points.
          frontPoints.push(startPoint);
        }
        if (startType !== FRONT) {
          // The inequality is important as it includes COPLANAR points.
          backPoints.push(startPoint);
        }
        if ((startType | endType) === SPANNING) {
          // This should exclude COPLANAR points.
          // Compute the point that touches the splitting plane.
          // const spanPoint = splitLineSegmentByPlane(plane, ...[startPoint, endPoint].sort());
          const spanPoint = splitLineSegmentByPlane(plane, startPoint, endPoint);
          if (squaredDistance(spanPoint, startPoint) > EPSILON2) {
            frontPoints.push(spanPoint);
          }
          if (squaredDistance(spanPoint, endPoint) > EPSILON2) {
            backPoints.push(spanPoint);
          }
        }
        startPoint = endPoint;
        startType = endType;
      }
      if (frontPoints.length >= 3) {
        frontPoints.plane = polygon.plane;
        front.push(frontPoints);
      }
      if (backPoints.length >= 3) {
        backPoints.plane = polygon.plane;
        back.push(backPoints);
      }
      break;
    }
  }
};

const BRANCH = 0;
const IN_LEAF = 1;
const OUT_LEAF = 2;

const inLeaf = {
  plane: [0, 0, 0, 0],
  same: [],
  kind: IN_LEAF
};

inLeaf.back = inLeaf;
inLeaf.front = inLeaf;

const outLeaf = {
  plane: [0, 0, 0, 0],
  same: [],
  kind: OUT_LEAF
};

outLeaf.back = outLeaf;
outLeaf.front = outLeaf;

const fromPolygons = (polygons) => {
  if (polygons.length === 0) {
    // Everything is outside of an empty geometry.
    return outLeaf;
  }
  let same = [];
  let front = [];
  let back = [];
  let plane = toPlane(polygons[0]);

  for (const polygon of polygons) {
    splitPolygon(plane,
                 polygon,
                 /* back= */back,
                 /* coplanarBack= */same,
                 /* coplanarFront= */same,
                 /* front= */front);
  }

  const bsp = {
    back: back.length === 0 ? inLeaf : fromPolygons(back),
    front: front.length === 0 ? outLeaf : fromPolygons(front),
    kind: BRANCH,
    plane,
    same
  };

  return bsp;
};

const fromSolid = (solid) => {
  const polygons = [];
  for (const surface of solid) {
    polygons.push(...surface);
  }
  return fromPolygons(polygons);
};

const removeInteriorPolygonsKeepingSkin = (bsp, polygons) => {
  if (bsp === inLeaf) {
    return [];
  } else if (bsp === outLeaf) {
    return polygons;
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* coplanarBack= */back,
                   /* coplanarFront= */front,
                   /* front= */front);
    }
    const trimmedFront = removeInteriorPolygonsKeepingSkin(bsp.front, front);
    const trimmedBack = removeInteriorPolygonsKeepingSkin(bsp.back, back);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return [].concat(trimmedFront, trimmedBack);
    }
  }
};

const removeInteriorPolygonsKeepingSkin2 = (bsp, polygons) => {
  if (bsp === inLeaf) {
    return [];
  } else if (bsp === outLeaf) {
    return polygons;
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* coplanarBack= */front,
                   /* coplanarFront= */back,
                   /* front= */front);
    }
    const trimmedFront = removeInteriorPolygonsKeepingSkin2(bsp.front, front);
    const trimmedBack = removeInteriorPolygonsKeepingSkin2(bsp.back, back);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return [].concat(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygons = (bsp, polygons) => {
  if (bsp === inLeaf) {
    return polygons;
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* coplanarBack= */back,
                   /* coplanarFront= */front,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygons(bsp.front, front);
    const trimmedBack = removeExteriorPolygons(bsp.back, back);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return [].concat(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygons2 = (bsp, polygons) => {
  if (bsp === inLeaf) {
    return polygons;
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* coplanarBack= */front,
                   /* coplanarFront= */back,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygons2(bsp.front, front);
    const trimmedBack = removeExteriorPolygons2(bsp.back, back);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return [].concat(trimmedFront, trimmedBack);
    }
  }
};

const removeExteriorPolygonsKeepingSkin = (bsp, polygons) => {
  if (bsp === inLeaf) {
    return polygons;
  } else if (bsp === outLeaf) {
    return [];
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* coplanarBack= */back,
                   /* coplanarFront= */back,
                   /* front= */front);
    }
    const trimmedFront = removeExteriorPolygonsKeepingSkin(bsp.front, front);
    const trimmedBack = removeExteriorPolygonsKeepingSkin(bsp.back, back);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return [].concat(trimmedFront, trimmedBack);
    }
  }
};

const dividePolygons = (bsp, polygons) => {
  if (bsp === inLeaf) {
    return polygons;
  } else if (bsp === outLeaf) {
    return polygons;
  } else {
    const front = [];
    const back = [];
    for (let i = 0; i < polygons.length; i++) {
      splitPolygon(bsp.plane,
                   polygons[i],
                   /* back= */back,
                   /* coplanarBack= */back,
                   /* coplanarFront= */back,
                   /* front= */front);
    }
    const trimmedFront = dividePolygons(bsp.front, front);
    const trimmedBack = dividePolygons(bsp.back, back);

    if (trimmedFront.length === 0) {
      return trimmedBack;
    } else if (trimmedBack.length === 0) {
      return trimmedFront;
    } else {
      return [].concat(trimmedFront, trimmedBack);
    }
  }
};

const cut = (solid, surface) => {
  // Build a classifier from the planar polygon.
  const cutBsp = fromPolygons(surface);
  const solidPolygons = toPolygons({}, solid);

  // Classify the solid with it.
  const trimmedSolid = removeExteriorPolygons(cutBsp, solidPolygons);

  // The solid will have holes that need to be patched with the parts of the
  // planar polygon that are on the solid boundary.
  const solidBsp = fromPolygons(solidPolygons);
  const trimmedPolygons = removeExteriorPolygons(solidBsp, surface);

  return fromPolygons$1({}, [...trimmedSolid, ...trimmedPolygons]);
};

const cutOpen = (solid, surface) => {
  // Build a classifier from the planar polygon.
  const cutBsp = fromPolygons(surface);
  const solidPolygons = toPolygons({}, solid);

  // Classify the solid with it.
  const trimmedSolid = removeExteriorPolygons(cutBsp, solidPolygons);

  return fromPolygons$1({}, trimmedSolid);
};

const containsPoint = (bsp, point) => {
  while (true) {
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

const deform = (solid, transform, heights) => {
  let bsp = inLeaf;

  // FIX: Build a balanced bsp.
  for (const height of heights) {
    // Build a classifier from heights.
    bsp = {
      back: bsp,
      front: outLeaf,
      kind: BRANCH,
      plane: [0, 0, 1, height],
      same: []
    };
  }

  const solidPolygons = toPolygons({}, solid);

  // Classify the solid with it.
  const dividedPolygons = dividePolygons(bsp, solidPolygons);

  // Now the solid should have vertexes at the given heights, and we can apply the transform.
  const transformedPolygons = dividedPolygons.map(path => path.map(transform));

  return fromPolygons$1({}, transformedPolygons);
};

const difference = (aSolid, ...bSolids) => {
  const normalize = createNormalize3();
  while (bSolids.length > 0) {
    const a = alignVertices(aSolid, normalize);
    const b = alignVertices(bSolids.shift(), normalize);

    if (doesNotOverlap(a, b)) {
      continue;
    }

    const aPolygons = toPolygons({}, a);
    const aBsp = fromSolid(a);

    const bPolygons = toPolygons({}, flip(b));
    const bBsp = fromSolid(b);

    const aTrimmed = removeInteriorPolygonsKeepingSkin2(bBsp, aPolygons);
    const bTrimmed = removeExteriorPolygons2(aBsp, bPolygons);

    aSolid = fromPolygons$1({}, [...aTrimmed, ...bTrimmed]);
  }
  return alignVertices(aSolid, normalize);
};

// An asymmetric binary merge.
const intersection = (...solids) => {
  if (solids.length === 0) {
    return [];
  }
  const normalize = createNormalize3();
  while (solids.length > 1) {
    const a = alignVertices(solids.shift(), normalize);
    const b = alignVertices(solids.shift(), normalize);

    if (doesNotOverlap(a, b)) {
      return [];
    }

    const aPolygons = toPolygons({}, a);
    const aBsp = fromSolid(a);

    const bPolygons = toPolygons({}, b);
    const bBsp = fromSolid(b);

    const aTrimmed = removeExteriorPolygonsKeepingSkin(bBsp, aPolygons);
    const bTrimmed = removeExteriorPolygonsKeepingSkin(aBsp, bPolygons);

    solids.push(fromPolygons$1({}, [...aTrimmed, ...bTrimmed]));
  }
  return alignVertices(solids[0], normalize);
};

const section = (solid, surface) => {
  const bsp = fromSolid(alignVertices(solid));
  return removeExteriorPolygons(bsp, surface);
};

// An asymmetric binary merge.
const union = (...solids) => {
  if (solids.length === 0) {
    return [];
  }
  const normalize = createNormalize3();
  while (solids.length > 1) {
    const a = alignVertices(solids.shift(), normalize);
    const aPolygons = toPolygons({}, a);
    const aBsp = fromSolid(a);

    const b = alignVertices(solids.shift(), normalize);
    const bPolygons = toPolygons({}, b);
    const bBsp = fromSolid(b);

    const aTrimmed = removeInteriorPolygonsKeepingSkin(bBsp, aPolygons);
    const bTrimmed = removeInteriorPolygonsKeepingSkin(aBsp, bPolygons);

    solids.push(fromPolygons$1({}, [...aTrimmed, ...bTrimmed]));
  }
  return alignVertices(solids[0], normalize);
};

export { containsPoint, cut, cutOpen, deform, difference, fromSolid, intersection, section, union };
