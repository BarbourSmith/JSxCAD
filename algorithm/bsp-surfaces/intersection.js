import {
  alignVertices,
  createNormalize3,
  toPolygons as toPolygonsFromSolid,
  fromPolygons as toSolidFromPolygons
} from '@jsxcad/geometry-solid';

import {
  boundPolygons,
  clean,
  fromBoundingBoxes,
  inLeaf,
  outLeaf,
  removeExteriorPolygonsForIntersectionDroppingOverlap,
  removeExteriorPolygonsForIntersectionKeepingOverlap,
  fromPolygons as toBspFromPolygons
} from './bsp';

import {
  doesNotOverlap,
  measureBoundingBox
} from '@jsxcad/geometry-polygons';

import { containsPoint } from './containsPoint';
import { max } from '@jsxcad/math-vec3';

const MIN = 0;

// An asymmetric binary merge.
export const intersection = (...solids) => {
  if (solids.length === 0) {
    return [];
  }
  if (solids.length === 1) {
    return solids[0];
  }
  const normalize = createNormalize3();
  const s = solids.map(solid => toPolygonsFromSolid({}, alignVertices(solid, normalize)));
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
    const aBsp = fromBoundingBoxes(aBB, bBB, inLeaf, toBspFromPolygons(aIn, normalize));

    const bPolygons = b;
    const [bIn] = boundPolygons(bbBsp, bPolygons, normalize);
    const bBsp = fromBoundingBoxes(aBB, bBB, inLeaf, toBspFromPolygons(bIn, normalize));

    if (aIn.length === 0) {
      const bbMin = max(aBB[MIN], bBB[MIN]);
      // There are two ways for aIn to be empty: the space is fully exclosed or fully vacated.
      const aBsp = toBspFromPolygons(a, normalize);
      if (containsPoint(aBsp, bbMin)) {
        // The space is fully enclosed.
        s.push(bIn);
      } else {
        // The space is fully vacated.
        return [];
      }
    } else if (bIn.length === 0) {
      const bbMin = max(aBB[MIN], bBB[MIN]);
      // There are two ways for bIn to be empty: the space is fully exclosed or fully vacated.
      const bBsp = toBspFromPolygons(b, normalize);
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
  return toSolidFromPolygons({}, s[0], normalize);
};
