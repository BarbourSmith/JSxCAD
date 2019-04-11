import { build } from './build';
import { clipTo } from './clipTo';
import { fromSurfaces } from './fromSurfaces';
import { flip } from './flip';
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

    const aBsp = fromSurfaces({}, aSolid);
    const bBsp = fromSurfaces({}, bSolid);

    flip(aBsp);
    clipTo(bBsp, aBsp);

    flip(bBsp);
    clipTo(aBsp, bBsp);
    clipTo(bBsp, aBsp);
    build(aBsp, toSurfaces({}, bBsp));

    flip(aBsp);

    // Push back for the next generation.
    solids.push(toSurfaces({}, aBsp));
  }
  return solids[0];
};
