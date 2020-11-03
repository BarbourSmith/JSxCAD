import { extrude } from './extrude.js';
import { fromNefPolyhedron } from './fromNefPolyhedron.js';
import { principlePlane } from './principlePlane.js';
import { section } from './section.js';
import { toNefPolyhedron } from './toNefPolyhedron.js';
import { unionOfNefPolyhedrons } from '@jsxcad/algorithm-cgal';

const far = 10000;

export const union = (a, b) => {
  if (a.isEmpty || b.isEmpty) {
    return a;
  }
  if (!a.isClosed) {
    return section(principlePlane(a), union(extrude(a, far, 0), b));
  }
  if (b.isClosed) {
    return fromNefPolyhedron(
      unionOfNefPolyhedrons(toNefPolyhedron(b), toNefPolyhedron(a))
    );
  } else {
    // The union of a surface and a solid is the solid.
    return a;
  }
};
