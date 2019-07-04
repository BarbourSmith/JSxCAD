import { doesNotOverlap, flip as flipSolid } from '@jsxcad/geometry-solid';

import { clipTo } from './clipTo';
import { flip } from './flip';
import { fromSurfaces } from './fromSurfaces';
import { toSurfaces } from './toSurfaces';

/**
 * Return a solid representing filled volume present in all provided solids.
 * A pairwise generational reduction is used.
 * @param {Array<Polygons>} solids - list Polygons.
 * @returns {Polygons} the resulting solid.
 * @example
 * let C = intersection(A, B)
 * @example
 * +--------+
 * |        |
 * |   A    |
 * |    +---+----+       +---+
 * |    |   |    |   =   + C +
 * +----+---+    |       +---+
 *      |    B   |
 *      |        |
 *      +--------+
 */
export const intersection = (...solids) => {
  // Run a queue so that intersections are generally against intersections of the same generation.
  while (solids.length > 1) {
    const aSolid = solids.shift();
    const bSolid = solids.shift();

    if (doesNotOverlap(aSolid, bSolid)) {
      // Once we produce an empty geometry, all further intersections must be empty.
      return [];
    }

    const aBsp = fromSurfaces({}, aSolid);
    const bBsp = fromSurfaces({}, bSolid);

    flip(aBsp);
    clipTo(bBsp, aBsp);

    flip(bBsp);
    clipTo(aBsp, bBsp);
    clipTo(bBsp, aBsp);

    // build(aBsp, toSurfaces({}, bBsp));
    // flip(aBsp);

    // Push back for the next generation.
    solids.push(flipSolid([...toSurfaces({}, aBsp), ...toSurfaces({}, bBsp)]));
  }
  return solids[0];
};
